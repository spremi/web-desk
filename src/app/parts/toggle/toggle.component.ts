import {
  Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output
} from '@angular/core';

@Component({
  selector: 'sp-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.sass'],
})
export class ToggleComponent implements OnInit {
  @Input() icons: string;
  @Input() labels: string;
  @Input() flag: boolean;

  @Output() mutate: EventEmitter<boolean> = new EventEmitter<boolean>();

  iconTrue: string;
  iconFalse: string;
  labelTrue: string;
  labelFalse: string;

  isHover: boolean;

  constructor() { }

  @HostListener('mouseenter')
  onMouseEnter(ev: MouseEvent): void {
    this.isHover = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(ev: MouseEvent): void {
    this.isHover = false;
  }

  @HostListener('click')
  onClick(ev: MouseEvent): void {
    this.flag = !this.flag;
    this.mutate.emit(this.flag);
  }

  @HostBinding('class')
  get hovered(): string {
    let r = (this.flag ? 'active' : '');

    r += (this.isHover ? ' mat-elevation-z2' : '');

    return r;
  }

  ngOnInit(): void {
    const arrIcons = this.icons.split(';');
    const arrLabels = this.labels.split(';');

    this.iconFalse = arrIcons[0];
    this.iconTrue = arrIcons[1];

    this.labelFalse = arrLabels[0];
    this.labelTrue = arrLabels[1];
  }
}
