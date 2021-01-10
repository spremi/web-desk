//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { Menu, MenuItem, Tray } from 'electron';

import * as path from 'path';
import * as url from 'url';

import { launchDeskApp } from './desk-app';
import { DeskApp, DeskConfig } from './models/desk-config';


const assetsDir = path.join(__dirname, './web-desk/assets');

/**
 * Application delegate in the system tray.
 */
let deskTray: Tray = null;

/**
 * Create tray menu.
 */
export function createTrayMenu(
    win: Electron.BrowserWindow,
    cfg: DeskConfig
  ): void {
  const trayTemplate: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'Configure',
        click: async () => {
          await win.loadURL(url.format({
              pathname: path.join(__dirname, './web-desk/index.html'),
              protocol: 'file:',
              slashes: true,
            }));
        },
      },
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
  const toggleWindow = (): void => {
    if (!win) {
      return;
    }

    if (win.isVisible()) {
      win.hide();
    } else {
      win.focus();
      win.show();
    }
  };

  deskTray = new Tray(path.join(assetsDir, 'app-tray.png'));

  deskTray.setTitle('Web Desk');
  deskTray.setToolTip('Web Desk');

  deskTray.setIgnoreDoubleClickEvents(true);
  deskTray.on('click', toggleWindow);

  //
  // Add configured applications to sub-menu.
  //
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
