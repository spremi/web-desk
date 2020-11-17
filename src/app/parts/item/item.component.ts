import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DeskApp } from '@models/desk-config';

@Component({
  selector: 'sp-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass'],
})
export class ItemComponent implements OnInit {

  @Input() data: DeskApp;

  constructor() { }

  ngOnInit(): void {
  }

  onOptions(ev: MouseEvent): void {
    ev.preventDefault();
    ev.stopPropagation();

    console.log('Options clicked');
  }

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent): void {
    ev.preventDefault();
    ev.stopPropagation();

    const elem = ev.target as HTMLElement;

    console.log('Clicked' + elem.tagName);
  }
}
