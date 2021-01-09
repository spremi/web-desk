import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeskApp, DeskConfig } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { OpStatus } from '@models/op-status';
import { DataService } from '@services/data.service';
import { IpcService } from '@services/ipc.service';

const ADD_SUCCESS = 'Desk application added.';
const ADD_FAILURE = 'Unable to add desk application.';

const MOD_SUCCESS = 'Desk application updated.';
const MOD_FAILURE = 'Unable to update the desk application.';

const DEL_SUCCESS = 'Desk application deleted.';
const DEL_FAILURE = 'Unable to delete the desk application.';

@Component({
  selector: 'sp-desk-app',
  templateUrl: './desk-app.component.html',
  styleUrls: ['./desk-app.component.sass'],
})
export class DeskAppComponent implements OnInit {
  app: DeskApp;

  aid: string = null;

  edit = false;
  delete = false;
  deleteConfirm = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataSvc: DataService,
    private ipcSvc: IpcService,
    private snackBar: MatSnackBar
   ) { }

  ngOnInit(): void {
    this.aid = this.route.snapshot.paramMap.get('id');

    this.app = this.dataSvc.getDeskApp(this.aid);
  }

  onDelete(): void {
    this.delete = true;
  }

  onDeleteCancel(): void {
    this.delete = false;
  }

  onDeleteConfirm(): void {
    this.deleteConfirm = true;

    const cmd = initIpcRequest(IpcNg2E.APP_DELETE);
    cmd.reqParams = [ this.aid ];

    this.ipcSvc.send<boolean>(cmd).then(result => {
      const msg = result ? DEL_SUCCESS : DEL_FAILURE;

      this.snackBar.open(msg, 'DISMISS');

      if (result) {
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

      if (this.app) {
        msg = status === OpStatus.SUCCESS ? MOD_SUCCESS : MOD_FAILURE;
      } else {
        msg = status === OpStatus.SUCCESS ? ADD_SUCCESS : ADD_FAILURE;
      }

      this.snackBar.open(msg, 'DISMISS');
    }

    this.edit = false;
  }
}
