import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeskApp, DeskAppEvent } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { IpcService } from '@services/ipc.service';
import { RunStateService } from '@services/run-state.service';
import { Subscription } from 'rxjs';

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

  constructor(
    private router: Router,
    private ipcSvc: IpcService,
    private runSvc: RunStateService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const subEvents = this.ipcSvc.getAppEvents().subscribe((ev: DeskAppEvent) => {
      console.log('Received event "' + ev.event + '" from desk app ' + ev.aid);
    });

    this.subs.push(subEvents);
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
