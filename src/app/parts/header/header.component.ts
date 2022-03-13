import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAdd(): void {
    if (this.isGroupContext()) {
      this.router.navigate(['desk-group']);
    } else {
      this.router.navigate(['desk-app']);
    }
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
