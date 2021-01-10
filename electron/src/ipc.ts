//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { BrowserWindow, IpcMainEvent } from 'electron/main';

import { addDeskApp, modDeskApp, readConfig } from './config';
import { initIpcResponse, IpcNg2E, IpcRequest, IPC_E2NG } from './models/ipc-request';


/**
 * Reference to main application window.
 */
let mainWin: BrowserWindow = null;

/**
 * Initialize IPC Handler.
 */
export function initIpcHandler(arg: BrowserWindow): void {
  mainWin = arg;
}

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
  let consume = false;

  switch (arg.reqKey) {
    case IpcNg2E.GET_APPS: {
        const cfg = readConfig();

        ret = JSON.stringify(initIpcResponse(true, cfg));
        break;
      }

    case IpcNg2E.APP_CREATE: {
        const res = addDeskApp(arg.reqParams[0],
                               arg.reqParams[1],
                               arg.reqParams[2]);

        ret = JSON.stringify(initIpcResponse(true, res));
        break;
      }

    case IpcNg2E.APP_MODIFY: {
        if (arg.reqParams.length < 5) {
          ret = JSON.stringify(initIpcResponse(false, 'Missing parameters'));
        } else {
          const res = modDeskApp(arg.reqParams[0],              // gid
                                arg.reqParams[1],               // aid
                                parseInt(arg.reqParams[2], 10), // seq
                                arg.reqParams[3],               // label
                                arg.reqParams[4]);              // url

          ret = JSON.stringify(initIpcResponse(true, res));
        }

        break;
      }

    case IpcNg2E.WIN_MINIMIZE: {
        consume = true;
        mainWin.hide();
        break;
      }

    default:
      break;
  }

  if (!consume) {
    event.sender.send(arg.resChannel, ret);
  }
}

/**
 * Send notification to specified window.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function ipcNotify(win: BrowserWindow, type: string, arg: any): void {

  console.log('[I] IPC: Notify - ' + type);

  win.webContents.send(IPC_E2NG, type, arg);
}
