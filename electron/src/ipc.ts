//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { IpcMainEvent } from 'electron/main';

import { initIpcResponse, IpcRequest } from './models/ipc-request';


/**
 * Handle IPC requests from Angular application.
 */
export function ipcHandler(event: IpcMainEvent, arg: IpcRequest): void {
  if (!arg) {
    console.log('[E] IPC: Received empty request.');

    event.sender.send(arg.resChannel, JSON.stringify(initIpcResponse(false)));

    return;
  }

  console.log('[I] IPC: Received request - ' + arg.reqKey);

  if (arg.reqKey === 'test-string') {
    event.sender.send(arg.resChannel,
      JSON.stringify(initIpcResponse(true, 'Hello!'))
    );
  }

  if (arg.reqKey === 'test-object') {
    const test = { msg: 'Hello again!'};

    event.sender.send(arg.resChannel,
      JSON.stringify(initIpcResponse(true, test))
    );
  }
}
