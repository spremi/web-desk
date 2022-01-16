import { Component, Input, OnInit } from '@angular/core';
import { DeskGroup } from '@models/desk-config';

@Component({
  selector: 'sp-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.sass'],
})
export class GroupViewComponent implements OnInit {

  @Input() data: DeskGroup;

  isSelected = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(): void {
    this.isSelected = !this.isSelected;
  }
}
