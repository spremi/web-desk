import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousRouteService } from '@services/previous-route.service';

@Component({
  selector: 'sp-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.sass'],
})
export class LicenseComponent implements OnInit {

  constructor(private router: Router,
              private prevRouteSvc: PreviousRouteService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    const prev = this.prevRouteSvc.get();

    if (prev === null) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl(prev);
    }
  }
}
