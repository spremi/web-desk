import { Component } from '@angular/core';
import { PreviousRouteService } from '@services/previous-route.service';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'web-desk';

  constructor(private prevRouteSvc: PreviousRouteService) { }
}
