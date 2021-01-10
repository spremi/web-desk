//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { BrowserWindow } from 'electron';

import * as path from 'path';

import { ipcNotify } from './ipc';
import { initDeskAppEvent, DeskAppEvents, DeskConfig } from './models/desk-config';


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
 * Custom 'UserAgent' definition.
 * Required to get through some websites that don't like 'electron' default.
 */
const UserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';

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
 * Returns true, if any desk app is running.
 */
export function isDeskAppRunning(): boolean {
  const i = deskApps.findIndex((elem) =>
                elem !== null && typeof elem === 'object');

  return i !== -1;
}

/**
 * Launch desk application.
 */
export function launchDeskApp(aid: string): void {
  //
  // Find index of the application with 'aid' in configuration.
  //
  const idx = refCfg.apps.findIndex(o => o.aid === aid);

  if (idx === -1) {
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

      ipcNotify(refMain,
        'DeskAppEvent',
        initDeskAppEvent(DeskAppEvents.CLOSED, aid, i));
    });

    deskApp.setSkipTaskbar(true);
    deskApp.setTitle(refCfg.apps[idx].label);
    deskApp.loadURL(refCfg.apps[idx].url, { userAgent: UserAgent });

    deskApps[idx] = deskApp;

    ipcNotify(refMain,
      'DeskAppEvent',
      initDeskAppEvent(DeskAppEvents.OPENED, aid, idx));
  }

  const choice = deskApps[idx];

  if (choice.isMinimized()) {
    choice.restore();
  }
}

/**
 * Close desk application.
 */
export function closeDeskApp(aid: string): void {
  //
  // Find index of the application with 'aid' in configuration.
  //
  const idx = refCfg.apps.findIndex(o => o.aid === aid);

  if (idx === -1) {
    return;
  }

  if (deskApps[idx] !== null) {
    const choice = deskApps[idx];

    choice.close();
  }
}
