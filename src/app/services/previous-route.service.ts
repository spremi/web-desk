import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PreviousRouteService {

  private prevRoute: string;
  private currRoute: string;

  constructor(private router: Router) {
    this.currRoute = this.router.url;
    this.prevRoute = null;

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.prevRoute = this.currRoute;
      this.currRoute = event.urlAfterRedirects;
    });
  }

  public get(): string {
    return this.prevRoute;
  }
}
