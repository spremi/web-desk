import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeskGroup } from '@models/desk-config';
import { UiStateService } from '@services/ui-state.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sp-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass'],
})
export class GroupComponent implements OnInit, OnDestroy {

  @Input() group: DeskGroup;

  isHover = false;
  isSelected = false;

  selectedGroups$: Observable<string[]>;

  private sub: Subscription;

  constructor(
    private router: Router,
    private uiSvc: UiStateService
  ) { }

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

  ngOnInit(): void {
    this.sub = this.uiSvc.getSelectedGroups()
      .subscribe(list => {
        if (list && list.indexOf(this.group.gid) !== -1) {
          this.isSelected = true;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSelect(): void {
    this.isSelected = !this.isSelected;

    if (this.isSelected) {
      this.uiSvc.addSelectedGroup(this.group.gid);
    } else {
      this.uiSvc.delSelectedGroup(this.group.gid);
    }
  }

  onDetails(): void {
    this.router.navigate(['desk-group', { id: this.group.gid }]);
  }
}
