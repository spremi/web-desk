import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeskGroup, isDeskGroup } from '@models/desk-config';
import { initIpcRequest, IpcNg2E, IpcRequest } from '@models/ipc-request';
import { OpStatus } from '@models/op-status';
import { DataService } from '@services/data.service';
import { IpcService } from '@services/ipc.service';

@Component({
  selector: 'sp-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.sass'],
})
export class GroupEditComponent implements OnInit {
  @Input() data: DeskGroup;
  @Output() status = new EventEmitter<OpStatus>();

  groupForm: FormGroup;

  isSelected = false;

  constructor(
    private ipcSvc: IpcService,
    private dataSvc: DataService
  ) { }

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      label: new FormControl((this.data && this.data.label ? this.data.label : ''), {
        validators: Validators.required,
      }),
      desc: new FormControl((this.data && this.data.desc ? this.data.desc : ''), {
        validators: Validators.required,
      }),
    });
  }

  onSelect(): void {
    this.isSelected = !this.isSelected;
  }

  onSubmit(): void {
    if (this.groupForm.pristine) {
      return;
    }

    if (this.groupForm.valid) {
      this.groupForm.disable();

      let cmd: IpcRequest;
      const params: string[] = [];

      if (isDeskGroup(this.data)) {
        cmd = initIpcRequest(IpcNg2E.GROUP_MODIFY);

        params.push(this.data.gid);
        params.push(this.groupForm.get('label').value);
        params.push(this.groupForm.get('desc').value);
        params.push(this.data.seq.toString());
      } else {
        cmd = initIpcRequest(IpcNg2E.GROUP_CREATE);

        params.push(this.groupForm.get('label').value);
        params.push(this.groupForm.get('desc').value);
      }

      cmd.reqParams = params;

      this.ipcSvc.send<DeskGroup>(cmd).then(result => {
        if (result) {
          if (cmd.reqKey === IpcNg2E.GROUP_CREATE) {
            this.dataSvc.addDeskGroup(result);
          } else {
            this.data.label = this.groupForm.get('label').value;
            this.data.desc = this.groupForm.get('desc').value;

            this.dataSvc.modDeskGroup(result);
          }

          this.status.emit(OpStatus.SUCCESS);
        } else {
          this.status.emit(OpStatus.FAILURE);
        }
      }).catch(err => {
        this.groupForm.enable();

        this.status.emit(OpStatus.FAILURE);
      });
    }
  }

  onCancel(): void {
    this.groupForm.reset();
    this.status.emit(OpStatus.CANCEL);
  }
}
