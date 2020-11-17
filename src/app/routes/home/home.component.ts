import { Component, OnInit } from '@angular/core';
import { DeskConfig } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { IpcService } from '@services/ipc.service';

@Component({
  selector: 'sp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {

  config: DeskConfig = null;

  constructor(private ipcSvc: IpcService) { }

  ngOnInit(): void {
    const reqConfig = initIpcRequest(IpcNg2E.GET_APPS);

    this.ipcSvc.send<DeskConfig>(reqConfig).then(result => {
      if (result) {
        this.config = result;
      } else {
        console.log('IPC failure.');
      }
    }).catch(err => {
        console.log(err);
    });
  }
}
