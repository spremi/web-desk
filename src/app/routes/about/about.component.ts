import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousRouteService } from '@services/previous-route.service';

@Component({
  selector: 'sp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
})
export class AboutComponent implements OnInit {

  constructor(private router: Router,
              private prevRouteSvc: PreviousRouteService) { }

  ngOnInit(): void {
  }

  onDismiss(): void {
    const prev = this.prevRouteSvc.get();

    if (prev === null) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl(prev);
    }
  }
}
