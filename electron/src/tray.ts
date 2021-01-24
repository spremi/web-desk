//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { BrowserWindow, Menu, MenuItem, Tray } from 'electron';

import * as path from 'path';

import { launchDeskApp } from './desk-app';
import { DeskApp, DeskConfig } from './models/desk-config';


const assetsDir = path.join(__dirname, './web-desk/assets');

/**
 * Main application window
 */
let refMain: BrowserWindow = null;

/**
 * Application delegate in the system tray.
 */
let deskTray: Tray = null;

/**
 * Template for tr
 */
const trayTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    id: 'apps',
    label: 'Application',
    submenu: [],
  },
  {
    type: 'separator',
  },
  {
    role: 'quit',
  },
];

/**
 * Toggle visibility of application window.
 */
function toggleWindow(): void {
  if (!refMain) {
    return;
  }

  if (refMain.isVisible()) {
    refMain.hide();
  } else {
    refMain.focus();
    refMain.show();
  }
}

/**
 * Create tray menu.
 */
export function createTrayMenu(
    win: Electron.BrowserWindow,
    cfg: DeskConfig
  ): void {

  refMain = win;

  deskTray = new Tray(path.join(assetsDir, 'app-tray.png'));

  deskTray.setTitle('Web Desk');
  deskTray.setToolTip('Web Desk');

  deskTray.setIgnoreDoubleClickEvents(true);
  deskTray.on('click', toggleWindow);

  updateTrayMenu(cfg);
}

/**
 * Update tray menu.
 */
export function updateTrayMenu(cfg: DeskConfig): void {
  const trayMenu = Menu.buildFromTemplate(trayTemplate);

  const trayApps = trayMenu.getMenuItemById('apps');

  cfg.apps.forEach((arg: DeskApp) => {
    trayApps.submenu.append(new MenuItem({
      id: arg.aid,
      label: arg.label,
      click: () => {
        launchDeskApp(arg.aid);
      },
    }));
  });

  deskTray.setContextMenu(trayMenu);
}
