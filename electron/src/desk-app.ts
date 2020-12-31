//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { BrowserWindow } from 'electron';

import * as path from 'path';

import { DeskConfig } from './models/desk-config';


/**
 * Main application window
 */
let refMain: BrowserWindow = null;

/**
 * Application configuration.
 */
let refCfg: DeskConfig = null;

/**
 * Array of desk applications.
 */
export let deskApps: BrowserWindow[] = null;

/**
 * Initialize desk applications.
 */
export function initDeskApps(
  win: Electron.BrowserWindow,
  cfg: DeskConfig): void {
    refMain = win;
    refCfg = cfg;

    deskApps = new Array(cfg.apps.length).fill(null);
}

/**
 * Launch desk application.
 */
export function launchDeskApp(idx: number): void {
  if (idx < 0 || idx > refCfg.apps.length) {
    return;
  }

  if (deskApps[idx] === null) {
    let deskApp = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        defaultEncoding: 'utf-8',
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
      },
    });

    deskApp.on('page-title-updated', (e: Event) => {
      //
      // Prevent title getting changed.
      //
      e.preventDefault();
    });

    deskApp.on('close', () => {
      //
      // Explicitly clear reference to desk-app before closing.
      //
      const i = deskApps.findIndex((elem) => elem !== null &&
                                    typeof elem === 'object' &&
                                    elem.id === deskApp.id);

      if (i !== -1) {
        deskApps[i] = null;
      }

      deskApp = null;
    });

    deskApp.setSkipTaskbar(true);
    deskApp.setTitle(refCfg.apps[idx].label);
    deskApp.loadURL(refCfg.apps[idx].url);

    deskApps[idx] = deskApp;
  }

  const choice = deskApps[idx];

  if (choice.isMinimized()) {
    choice.restore();
  }
}
