import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RuntimeAttrs } from '@models/app-state';
import { DeskApp } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { IpcService } from '@services/ipc.service';
import { RunStateService } from '@services/run-state.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const START_SUCCESS = 'Desk application started.';
const START_FAILURE = 'Unable to start the desk application.';

@Component({
  selector: 'sp-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.sass'],
})
export class WidgetComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  @Input() app: DeskApp;

  runAttrs: RuntimeAttrs;

  constructor(
    private router: Router,
    private ipcSvc: IpcService,
    private runSvc: RunStateService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const runState = this.runSvc.getApps().pipe(
        // Continue if 'our' key is present.
        filter(obj => this.app.aid in obj),
        // Extract value of 'our' key.
        map(obj => obj[this.app.aid])
      ).subscribe((attrs: RuntimeAttrs) => {
        this.runAttrs = attrs;
      });

    this.subs.push(runState);
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

  onLaunch(): void {
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
}
