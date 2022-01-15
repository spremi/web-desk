import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelect(): void {
    this.isSelected = !this.isSelected;
  }

  onDetails(): void {
    this.router.navigate(['desk-group', { id: this.group.gid }]);
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
