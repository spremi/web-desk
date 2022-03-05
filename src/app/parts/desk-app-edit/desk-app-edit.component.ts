import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DeskApp } from '@models/desk-config';
import { initIpcRequest, IpcNg2E, IpcRequest } from '@models/ipc-request';
import { OpStatus } from '@models/op-status';
import { DataService } from '@services/data.service';
import { IpcService } from '@services/ipc.service';

@Component({
  selector: 'sp-desk-app-edit',
  templateUrl: './desk-app-edit.component.html',
  styleUrls: ['./desk-app-edit.component.sass'],
})
export class DeskAppEditComponent implements OnInit {

  @Input() data: DeskApp;

  @Output() status = new EventEmitter<OpStatus>();

  appForm: FormGroup;

  constructor(private ipcSvc: IpcService, private dataSvc: DataService) { }

  ngOnInit(): void {
    this.appForm = new FormGroup({
      label: new FormControl((this.data && this.data.label ? this.data.label : ''), {
        validators: Validators.required,
      }),
      url: new FormControl((this.data && this.data.url ? this.data.url : ''), {
        validators: Validators.required,
      }),
    });
  }

  onSubmit(): void {
    if (this.appForm.pristine) {
      return;
    }

    const DEFAULT_GID = '0';

    if (this.appForm.valid) {
      this.appForm.disable();

      let cmd: IpcRequest;
      const params: string[] = [];

      if (this.data) {
        cmd = initIpcRequest(IpcNg2E.APP_MODIFY);

        params.push(this.data.gid);
        params.push(this.data.aid);
        params.push(this.data.seq.toString());
      } else {
        cmd = initIpcRequest(IpcNg2E.APP_CREATE);

        params.push(DEFAULT_GID);
      }

      params.push(this.appForm.get('label').value);
      params.push(this.appForm.get('url').value);

      cmd.reqParams = params;

      this.ipcSvc.send<DeskApp>(cmd).then(result => {
        if (result) {
          if (cmd.reqKey === IpcNg2E.APP_CREATE) {
            this.dataSvc.addDeskApp(result);
          } else {
            this.data.label = this.appForm.get('label').value;
            this.data.url = this.appForm.get('url').value;

            this.dataSvc.modDeskApp(result);
          }

          this.status.emit(OpStatus.SUCCESS);
        } else {
          this.status.emit(OpStatus.FAILURE);
        }
      }).catch(err => {
        this.appForm.enable();

        this.status.emit(OpStatus.FAILURE);
      });
    }
  }

  onCancel(): void {
    this.appForm.reset();
    this.status.emit(OpStatus.CANCEL);
  }
}
