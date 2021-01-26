//
// @project     web-desk
//
// @author      Sanjeev Premi
//
// @license     BSD-3-Clause
//

//
// Entry point for the application.
//

import { app, ipcMain, BrowserWindow } from 'electron';

import * as path from 'path';
import * as url from 'url';

import { ensureConfig, readConfig } from './config';
import { initDeskApps } from './desk-app';
import { initIpcHandler, ipcHandler } from './ipc';
import { initLogger } from './logger';
import { DeskConfig } from './models/desk-config';
import { IPC_NG2E } from './models/ipc-request';
import { createTrayMenu } from './tray';

let appWin: Electron.BrowserWindow = null;
let appCfg: DeskConfig = null;

/**
 * Create the browser window.
 */
function createWindow(): void {
  //
  // Create browser window.
  //
  appWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      defaultEncoding: 'utf-8',
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  //
  // Load the top-level index page.
  //
  appWin.loadURL(url.format({
      pathname: path.join(__dirname, './web-desk/index.html'),
      protocol: 'file:',
      slashes: true,
    }));

  //
  // Initialize logger.
  //
  initLogger(!app.isPackaged);

  //
  // Open developer console.
  //
  if (!app.isPackaged) {
    appWin.webContents.openDevTools();
  }

  //
  // Explicitly set the window object
  //
  appWin.on('closed', () => {
    appWin = null;
  });

  initIpcHandler(appWin);

  //
  // Listen to IPC requests.
  //
  ipcMain.on(IPC_NG2E, ipcHandler);
}

//
// Electron initialization is complete.
// Create the browser window.
//
app.on('ready', () => {
  ensureConfig();

  appCfg = readConfig();

  createWindow();
  appWin.setMenu(null);

  createTrayMenu(appWin, appCfg);

  initDeskApps(appWin, appCfg);
});

//
// On macOS, dock icon is clicked.
//
app.on('activate', () => {
  //
  // If no window is open, create one.
  //
  if (appWin === null) {
    createWindow();
  }
});

//
// Quit application when all windows are closed, except macOS.
//
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
