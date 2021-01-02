import { Component, OnInit } from '@angular/core';
import { DeskAppEvent, DeskAppEvents } from '@models/desk-config';
import { initIpcRequest } from '@models/ipc-request';
import { IpcService } from '@services/ipc.service';
import { PreviousRouteService } from '@services/previous-route.service';
import { Subscription } from 'rxjs';

interface TestMessage {
  msg: string;
}

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'web-desk';

  private runningApps = 0;
  private sub: Subscription;

  constructor(private prevRouteSvc: PreviousRouteService,
              private ipcSvc: IpcService
  ) { }

  ngOnInit(): void {
    const testString = initIpcRequest('test-string');

    this.ipcSvc.send<string>(testString).then(result => {
      if (result) {
        console.log('IPC success. Result = ' + result);
      } else {
        console.log('IPC failure.');
      }
    }).catch(err => {
        console.log(err);
    });

    const testObject = initIpcRequest('test-object');

    this.ipcSvc.send<TestMessage>(testObject).then(result => {
      if (result) {
        console.log('IPC success. Result = ' + JSON.stringify(result));
      } else {
        console.log('IPC failure.');
      }
    }).catch(err => {
        console.log(err);
    });

    this.sub = this.ipcSvc.getAppEvents().subscribe((ev: DeskAppEvent) => {
      switch (ev.event) {
        case DeskAppEvents.OPENED:
          this.runningApps++;
          break;

        case DeskAppEvents.CLOSED:
          this.runningApps--;
          break;

        default:
          break;
      }
    });
  }
}
