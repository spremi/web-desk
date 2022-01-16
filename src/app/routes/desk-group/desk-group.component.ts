import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { initDeskGroup, DeskGroup } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { OpStatus } from '@models/op-status';
import { DataService } from '@services/data.service';
import { IpcService } from '@services/ipc.service';
import { RunStateService } from '@services/run-state.service';
import { Observable } from 'rxjs';

const ADD_SUCCESS = 'Desk group added.';
const ADD_FAILURE = 'Unable to add desk group.';

const MOD_SUCCESS = 'Desk group updated.';
const MOD_FAILURE = 'Unable to update the desk group.';

const DEL_SUCCESS = 'Desk group deleted.';
const DEL_FAILURE = 'Unable to delete the desk group.';

@Component({
  selector: 'sp-desk-group',
  templateUrl: './desk-group.component.html',
  styleUrls: ['./desk-group.component.sass'],
})
export class DeskGroupComponent implements OnInit {

  group: DeskGroup;

  gid: string = null;

  canEdit$: Observable<boolean>;

  add = false;
  edit = false;
  delete = false;
  deleteConfirm = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataSvc: DataService,
    private ipcSvc: IpcService,
    private runSvc: RunStateService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.canEdit$ = this.runSvc.getEdit();
    this.gid = this.route.snapshot.paramMap.get('id');

    if (this.gid) {
      this.group = this.dataSvc.getDeskGroup(this.gid);
    } else {
      this.group = initDeskGroup();
      this.add = true;
      this.edit = true;
    }
  }

  onDelete(): void {
    this.delete = true;
  }

  onDeleteCancel(): void {
    this.delete = false;
  }

  onDeleteConfirm(): void {
    this.deleteConfirm = true;

    const cmd = initIpcRequest(IpcNg2E.GROUP_DELETE);
    cmd.reqParams = [this.gid];

    this.ipcSvc.send<boolean>(cmd).then(result => {
      const msg = result ? DEL_SUCCESS : DEL_FAILURE;

      this.snackBar.open(msg, 'DISMISS');

      if (result) {
        this.dataSvc.delDeskGroup(this.gid);

        this.router.navigate(['home']);
      } else {
        this.delete = false;
        this.deleteConfirm = false;
      }
    }).catch(err => {
      this.snackBar.open(DEL_FAILURE, 'DISMISS');

      this.delete = false;
      this.deleteConfirm = false;
    });
  }

  onEdit(): void {
    this.edit = !this.edit;
  }

  onClose(): void {
    this.router.navigate(['home']);
  }

  onStatus(status: OpStatus): void {
    if (status !== OpStatus.CANCEL) {
      let msg: string;

      if (this.group) {
        msg = status === OpStatus.SUCCESS ? MOD_SUCCESS : MOD_FAILURE;
      } else {
        msg = status === OpStatus.SUCCESS ? ADD_SUCCESS : ADD_FAILURE;

        this.router.navigate(['home']);
      }

      this.snackBar.open(msg, 'DISMISS');
    } else {
      if (this.add) {
        this.router.navigate(['home']);
      }
    }

    this.edit = false;
  }
}
