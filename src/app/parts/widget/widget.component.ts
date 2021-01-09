import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeskApp, DeskAppEvent } from '@models/desk-config';
import { IpcService } from '@services/ipc.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sp-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.sass'],
})
export class WidgetComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  @Input() app: DeskApp;

  constructor(private ipcSvc: IpcService) { }

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
    console.log('TODO: Show details.');
  }

  onLaunch(): void {
    console.log('TODO: Launch application.');
  }
}
