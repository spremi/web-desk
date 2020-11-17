//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { IpcMainEvent } from 'electron/main';

import { readConfig } from './config';
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

  let ret = '';

  switch (arg.reqKey) {
    case 'config': {
        const cfg = readConfig();

        ret = JSON.stringify(initIpcResponse(true, cfg));
        break;
      }

    case 'test-string': {
      ret = JSON.stringify(initIpcResponse(true, 'Hello!'));
      break;
    }

    case 'test-object': {
      const test = { msg: 'Hello again!'};

      ret = JSON.stringify(initIpcResponse(true, test));
      break;
    }

    default:
      break;
  }

  event.sender.send(arg.resChannel, ret);
}
