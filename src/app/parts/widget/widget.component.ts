import { ChangeDetectorRef, Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RuntimeAttrs } from '@models/app-state';
import { DeskApp } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { IpcService } from '@services/ipc.service';
import { RunStateService } from '@services/run-state.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const START_FAILURE = 'Unable to start the desk application.';
const STOP_FAILURE = 'Unable to stop the desk application.';
const MINIMIZE_FAILURE = 'Unable to minimize desk application window.';
const RESTORE_FAILURE = 'Unable to restore desk application window.';

@Component({
  selector: 'sp-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.sass'],
})
export class WidgetComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  @Input() app: DeskApp;

  @HostBinding('class.running')
  isRunning = false;
  isMinimized = false;

  @HostBinding('class.hovered')
  isHover = false;

  constructor(
    private router: Router,
    private ipcSvc: IpcService,
    private runSvc: RunStateService,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const runState = this.runSvc.getApps().pipe(
      filter(obj => this.app.aid in obj),   // Continue if 'aid' exists as key
      map(obj => obj[this.app.aid])         // Extract attributes for the 'aid'
    ).subscribe((attrs: RuntimeAttrs) => {
      this.isRunning = attrs.isRunning;
      this.isMinimized = attrs.isMinimized;

      this.cd.detectChanges();              // Force immediate detection
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  onDetails(): void {
    this.router.navigate(['desk-app', {id: this.app.aid}]);
  }

  onStart(): void {
    const cmd = initIpcRequest(IpcNg2E.APP_LAUNCH);
    cmd.reqParams = [ this.app.aid ];

    this.ipcSvc.send<boolean>(cmd).then(result => {
      //
      // Successful launch is reported via parallel event channel.
      //
      if (!result) {
        this.snackBar.open(START_FAILURE, 'DISMISS');
      }
    }).catch(err => {
      this.snackBar.open(START_FAILURE, 'DISMISS');
    });
  }

  onStop(): void {
    const cmd = initIpcRequest(IpcNg2E.APP_CLOSE);
    cmd.reqParams = [ this.app.aid ];

    this.ipcSvc.send<boolean>(cmd).then(result => {
      //
      // Successful closure is reported via parallel event channel.
      //
      if (!result) {
        this.snackBar.open(STOP_FAILURE, 'DISMISS');
      }
    }).catch(err => {
      this.snackBar.open(STOP_FAILURE, 'DISMISS');
    });
  }

  onVisibility(): void {
    if (!this.isRunning) {
      return;
    }

    const cmd = initIpcRequest(
                  this.isMinimized ? IpcNg2E.WIN_RESTORE : IpcNg2E.WIN_MINIMIZE);
    cmd.reqParams = [ this.app.aid ];

    const failMsg = this.isMinimized ? RESTORE_FAILURE : MINIMIZE_FAILURE;

    this.ipcSvc.send<boolean>(cmd).then(result => {
      if (result) {
        this.isMinimized = !this.isMinimized;
      } else {
        this.snackBar.open(failMsg, 'DISMISS');
      }
    }).catch(err => {
      this.snackBar.open(failMsg, 'DISMISS');
    });
  }

  @HostListener('mouseenter')
  onMouseEnter(ev: MouseEvent): void {
    this.isHover = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(ev: MouseEvent): void {
    this.isHover = false;
  }
}
