import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { DeskGroup } from '@models/desk-config';

@Component({
  selector: 'sp-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass'],
})
export class GroupComponent implements OnInit {

  @Input() group: DeskGroup;

  isHover = false;
  isSelected = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event.target'])
  onClick(): void {
    this.isSelected = !this.isSelected;
  }

  @HostListener('mouseenter')
  onMouseEnter(ev: MouseEvent): void {
    this.isHover = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(ev: MouseEvent): void {
    this.isHover = false;
  }

  @HostBinding('class.hovered')
  get hovered(): boolean {
    return this.isHover;
  }

  @HostBinding('class')
  get elevation(): string {
    return this.isHover ? 'mat-elevation-z8' : 'mat-elevation-z1';
  }
}
