import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { RunStateService } from '@services/run-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  /**
   * Array of subscriptions.
   */
  private subs: Subscription[] = [];

  canEdit = false;

  constructor(private router: Router, private runSvc: RunStateService) { }

  ngOnInit(): void {
    const subEdit = this.runSvc.getEdit().subscribe(flag => {
      this.canEdit = flag;
    });

    this.subs.push(subEdit);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  onClose(): void {
    this.router.navigate(['home']);
  }

  toggleEdit(ev: MatSlideToggleChange): void {
    this.runSvc.setEdit(ev.checked);
  }
}
