import { Component, Input, OnInit } from '@angular/core';

import { DeskApp } from '@models/desk-config';

@Component({
  selector: 'sp-desk-app-view',
  templateUrl: './desk-app-view.component.html',
  styleUrls: ['./desk-app-view.component.sass'],
})
export class DeskAppViewComponent implements OnInit {

  @Input() data: DeskApp;

  constructor() { }

  ngOnInit(): void {
  }

  onOptions(ev: MouseEvent): void {
    ev.preventDefault();
    ev.stopPropagation();

    console.log('TODO: Show options.');
  }

  onLaunch(ev: MouseEvent): void {
    ev.preventDefault();
    ev.stopPropagation();

    console.log('TODO: Launch application.');
  }
}
