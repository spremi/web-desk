import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'sp-desk-app-view',
  templateUrl: './desk-app-view.component.html',
  styleUrls: ['./desk-app-view.component.sass'],
})
export class DeskAppViewComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  @Input() app: DeskApp;

  isRunning = false;
  isVisible = false;

  constructor(
    private ipcSvc: IpcService,
    private runSvc: RunStateService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sub = this.runSvc.getApps().pipe(
      filter(obj => this.app.aid in obj),   // Continue if 'aid' exists as key
      map(obj => obj[this.app.aid])         // Extract attributes for the 'aid'
    ).subscribe((attrs: RuntimeAttrs) => {
      this.isRunning = attrs.isRunning;
      this.isVisible = attrs.isMinimized;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
    const cmd = initIpcRequest(IpcNg2E.WIN_CLOSE);
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
    const cmd = initIpcRequest(
                  this.isVisible ? IpcNg2E.WIN_MINIMIZE : IpcNg2E.WIN_RESTORE);
    cmd.reqParams = [ this.app.aid ];

    const failMsg = this.isVisible ? MINIMIZE_FAILURE : RESTORE_FAILURE;

    this.ipcSvc.send<boolean>(cmd).then(result => {
      if (result) {
        this.isVisible = !this.isVisible;
      } else {
        this.snackBar.open(failMsg, 'DISMISS');
      }
    }).catch(err => {
      this.snackBar.open(failMsg, 'DISMISS');
    });
  }
}
