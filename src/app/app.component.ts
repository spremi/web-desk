import { Component, HostListener, OnInit } from '@angular/core';
import { DeskAppEvent, DeskAppEvents } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { IpcService } from '@services/ipc.service';
import { PreviousRouteService } from '@services/previous-route.service';
import { Subscription } from 'rxjs';

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

  @HostListener('window:beforeunload', ['$event'])
  beforeWinClose(e: Event): void {
    if (this.runningApps > 0) {
      e.preventDefault();
      e.returnValue = false;

      //
      // Don't close the application.
      // Instead, request electron to minimize window.
      //
      const req = initIpcRequest(IpcNg2E.WIN_MINIMIZE);

      this.ipcSvc.send<string>(req).then(result => {
        if (!result) {
          console.log('IPC failure during WIN_MINIMIZE.');
        }
      }).catch(err => {
          console.log(err);
      });
    }
  }
}
