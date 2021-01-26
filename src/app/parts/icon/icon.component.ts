import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sp-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass'],
})
export class IconComponent implements OnInit {

  @Input() icon: string;
  @Input() label: string;
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }
}
