import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DeskAppEvent, DeskAppEvents } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { DataService } from '@services/data.service';
import { IpcService } from '@services/ipc.service';
import { PreviousRouteService } from '@services/previous-route.service';
import { RunStateService } from '@services/run-state.service';
import { UiStateService } from '@services/ui-state.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'web-desk';

  showSettings$: Observable<boolean>;

  private runningApps = 0;
  private sub: Subscription;

  constructor(private prevRouteSvc: PreviousRouteService,
    private dataSvc: DataService,
    private uiSvc: UiStateService,
    private runSvc: RunStateService,
    private ipcSvc: IpcService
  ) { }

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

  ngOnInit(): void {
    this.dataSvc.init();
    this.uiSvc.init();
    this.runSvc.init();

    this.showSettings$ = this.uiSvc.isViewSettings();

    this.sub = this.ipcSvc.getAppEvents().subscribe((ev: DeskAppEvent) => {
      switch (ev.event) {
        case DeskAppEvents.OPENED:
          this.runSvc.appOpen(ev.aid);
          this.runningApps++;
          break;

        case DeskAppEvents.CLOSED:
          this.runSvc.appClose(ev.aid);
          this.runningApps--;
          break;

        case DeskAppEvents.MINIMIZED:
          this.runSvc.appMinimize(ev.aid, true);
          break;

        case DeskAppEvents.RESTORED:
          this.runSvc.appMinimize(ev.aid, false);
          break;

        default:
          break;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
