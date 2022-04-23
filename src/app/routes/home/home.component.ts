import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeskApp, DeskGroup } from '@models/desk-config';
import { DataService } from '@services/data.service';
import { UiStateService } from '@services/ui-state.service';
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
    private uiSvc: UiStateService
  ) { }

  ngOnInit(): void {

    this.viewByGroup$ = this.uiSvc.isViewByGroup();
    this.viewSelGroups$ = this.uiSvc.isViewSelectedGroups();
    this.selGroups$ = this.uiSvc.getSelectedGroups();

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
