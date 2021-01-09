import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DeskApp } from '@models/desk-config';
import { initIpcRequest, IpcNg2E, IpcRequest } from '@models/ipc-request';
import { IpcService } from '@services/ipc.service';

@Component({
  selector: 'sp-desk-app-edit',
  templateUrl: './desk-app-edit.component.html',
  styleUrls: ['./desk-app-edit.component.sass'],
})
export class DeskAppEditComponent implements OnInit {

  appForm: FormGroup;

  @Input() data: DeskApp;

  constructor(private ipcSvc: IpcService) { }

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

      if (this.data === null) {
        cmd = initIpcRequest(IpcNg2E.APP_CREATE);

        params.push(DEFAULT_GID);
      } else {
        cmd = initIpcRequest(IpcNg2E.APP_MODIFY);

        params.push(this.data.gid);
        params.push(this.data.aid);
        params.push(this.data.seq.toString());
      }

      params.push(this.appForm.get('label').value);
      params.push(this.appForm.get('url').value);

      cmd.reqParams = params;

      this.ipcSvc.send<DeskApp>(cmd).then(result => {
        if (!result) {
          console.log('IPC failure save.');
        }

        this.appForm.reset();
      }).catch(err => {
          console.log(err);

          this.appForm.enable();
      });
    }
  }

  onCancel(): void {
    this.appForm.reset();
  }
}
