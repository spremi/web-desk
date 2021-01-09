import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {

  canEdit = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.router.navigate(['home']);
  }

  toggleEdit(ev: MatSlideToggleChange): void {
  }
}
