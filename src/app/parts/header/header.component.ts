import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RunStateService } from '@services/run-state.service';

@Component({
  selector: 'sp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {

  private showSettings = false;

  constructor(
    private router: Router,
    private runSvc: RunStateService
  ) { }

  ngOnInit(): void {
  }

  onAdd(): void {
    if (this.isGroupContext()) {
      this.router.navigate(['desk-group']);
    } else {
      this.router.navigate(['desk-app']);
    }
  }

  onSettings(): void {
    this.showSettings = !this.showSettings;

    this.runSvc.showSettings(this.showSettings);
  }

  /**
   * Is the current view related to 'group'?
   */
  private isGroupContext(): boolean {
    const url = this.router.url;

    if (url.startsWith('/groups') || url.startsWith('/desk-group')) {
      return true;
    }

    return false;
  }
}
