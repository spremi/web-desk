import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeskApp } from '@models/desk-config';
import { DataService } from '@services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  apps: DeskApp[];

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.sub = this.dataSvc.getDeskApps().subscribe(result => {
      this.apps = result;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
