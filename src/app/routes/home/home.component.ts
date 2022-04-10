import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeskApp, DeskGroup } from '@models/desk-config';
import { DataService } from '@services/data.service';
import { RunStateService } from '@services/run-state.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  apps: DeskApp[];

  viewByGroup$: Observable<boolean>;
  viewSelGroups$: Observable<boolean>;

  groups$: Observable<DeskGroup[]>;
  selGroups$: Observable<string[]>;

  private sub: Subscription;

  constructor(
    private dataSvc: DataService,
    private runSvc: RunStateService
  ) { }

  ngOnInit(): void {

    this.viewByGroup$ = this.runSvc.getViewByGroup();
    this.viewSelGroups$ = this.runSvc.getViewSelectedGroups();
    this.selGroups$ = this.runSvc.getSelectedGroups();

    this.sub = this.dataSvc.getDeskApps().subscribe(result => {
      this.apps = result;
    });

    this.groups$ = this.dataSvc.getDeskGroups();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
