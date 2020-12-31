import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { DeskApp, DeskAppEvent } from '@models/desk-config';
import { IpcService } from '@services/ipc.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sp-desk-app-view',
  templateUrl: './desk-app-view.component.html',
  styleUrls: ['./desk-app-view.component.sass'],
})
export class DeskAppViewComponent implements OnInit, OnDestroy {

  @Input() data: DeskApp;

  private sub: Subscription;

  constructor(private ipcSvc: IpcService) { }

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

  onOptions(ev: MouseEvent): void {
    ev.preventDefault();
    ev.stopPropagation();

    console.log('TODO: Show options.');
  }

  onLaunch(ev: MouseEvent): void {
    ev.preventDefault();
    ev.stopPropagation();

    console.log('TODO: Launch application.');
  }
}
