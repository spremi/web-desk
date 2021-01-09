import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DeskApp, DeskAppEvent } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { IpcService } from '@services/ipc.service';
import { Subscription } from 'rxjs';

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

  @Input() app: DeskApp;

  private sub: Subscription;

  isRunning = false;
  isVisible = false;

  constructor(private ipcSvc: IpcService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sub = this.ipcSvc.getAppEvents().subscribe((ev: DeskAppEvent) => {
      console.log('Received event "' + ev.event + '" from desk app ' + ev.aid);
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
      if (result) {
        this.isRunning = true;
        this.isVisible = true;
      } else {
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
      if (result) {
        this.isRunning = false;
        this.isVisible = false;
      } else {
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
