//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { BrowserWindow, IpcMainEvent } from 'electron/main';

import { addDeskApp, delDeskApp, modDeskApp, readConfig } from './config';
import {
  addRunConfig, closeDeskApp, delRunConfig, launchDeskApp, minimizeDeskApp, modRunConfig, restoreDeskApp
} from './desk-app';
import { logI, logW } from './logger';
import { initIpcResponse, IpcNg2E, IpcRequest, IPC_E2NG } from './models/ipc-request';
import { updateTrayMenu } from './tray';


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
 *
 * Some requests result in action - without any 'real' value to be returned
 * back. In such, cases, simply return a truthy status as acknowledgement.
 */
export function ipcHandler(event: IpcMainEvent, arg: IpcRequest): void {
  if (!arg) {
    logW('IPC: Received empty request.');

    event.sender.send(arg.resChannel, JSON.stringify(initIpcResponse(false)));

    return;
  }

  logI('IPC: Received request - ' + arg.reqKey);

  let ret = '';

  let updateTray = false;

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

        addRunConfig(res);
        updateTray = true;
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

          modRunConfig(res);
          updateTray = true;
        }

        break;
      }

    case IpcNg2E.APP_DELETE: {
        const res = delDeskApp(arg.reqParams[0]);

        ret = JSON.stringify(initIpcResponse(true, res));

        delRunConfig(arg.reqParams[0]);
        updateTray = true;
        break;
      }

    case IpcNg2E.APP_LAUNCH: {
        launchDeskApp(arg.reqParams[0]);

        ret = JSON.stringify(initIpcResponse(true, true));
        break;
      }

    case IpcNg2E.APP_CLOSE: {
        closeDeskApp(arg.reqParams[0]);

        ret = JSON.stringify(initIpcResponse(true, true));
        break;
      }

    case IpcNg2E.WIN_MINIMIZE: {
        if (arg.reqParams && arg.reqParams.length > 0) {
          minimizeDeskApp(arg.reqParams[0]);

        } else {
          mainWin.minimize();
          mainWin.hide();
        }

        ret = JSON.stringify(initIpcResponse(true, true));
        break;
      }

    case IpcNg2E.WIN_RESTORE: {
        restoreDeskApp(arg.reqParams[0]);

        ret = JSON.stringify(initIpcResponse(true, true));
        break;
      }

    default:
      break;
  }

  event.sender.send(arg.resChannel, ret);

  if (updateTray) {
    const cfg = readConfig();

    updateTrayMenu(cfg);
  }
}

/**
 * Send notification to specified window.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function ipcNotify(win: BrowserWindow, type: string, arg: any): void {

  logI('IPC: Notify - ' + type);

  win.webContents.send(IPC_E2NG, type, arg);
}
