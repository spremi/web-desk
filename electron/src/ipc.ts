//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { BrowserWindow, IpcMainEvent } from 'electron/main';

import { readConfig } from './config';
import { initIpcResponse, IpcNg2E, IpcRequest, IPC_E2NG } from './models/ipc-request';

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
    case IpcNg2E.GET_APPS: {
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

/**
 * Send notification to specified window.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function ipcNotify(win: BrowserWindow, type: string, arg: any): void {

  console.log('[I] IPC: Notify - ' + type);

  win.webContents.send(IPC_E2NG, type, arg);
}
