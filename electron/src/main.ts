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

import { ipcHandler } from './ipc';
import { IPC_NG2E } from './models/ipc-request';

let appWin: Electron.BrowserWindow = null;

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
  // Open developer console.
  //
  appWin.webContents.openDevTools();

  //
  // Explicitly set the window object
  //
  appWin.on('closed', () => {
    appWin = null;
  });

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
  createWindow();
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
