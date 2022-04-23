import { Component, OnInit } from '@angular/core';
import { RunStateService } from '@services/run-state.service';
import { UiStateService } from '@services/ui-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {

  canEdit$: Observable<boolean>;
  viewByGroup$: Observable<boolean>;
  viewByFilter$: Observable<boolean>;

  constructor(
    private runSvc: RunStateService,
    private uiSvc: UiStateService
  ) { }

  ngOnInit(): void {
    this.canEdit$ = this.uiSvc.getEdit();
    this.viewByGroup$ = this.runSvc.getViewByGroup();
    this.viewByFilter$ = this.runSvc.getViewSelectedGroups();
  }

  onToggleEdit(flag: boolean): void {
    this.uiSvc.setEdit(flag);
  }

  onViewByGroup(flag: boolean): void {
    this.runSvc.setViewByGroup(flag);
  }

  onViewByFilter(flag: boolean): void {
    this.runSvc.setViewSelectedGroups(flag);
  }
}
