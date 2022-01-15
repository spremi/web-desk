import { Component, OnInit } from '@angular/core';
import { DeskGroup } from '@models/desk-config';
import { DataService } from '@services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sp-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit {

  groups$: Observable<DeskGroup[]>;

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.groups$ = this.dataSvc.getDeskGroups();
  }
}
