//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { Menu, MenuItem } from 'electron';

import { DeskApp, DeskConfig } from './models/desk-config';

import * as path from 'path';
import * as url from 'url';

/**
 * Create application menu.
 */
export function createAppMenu(
    win: Electron.BrowserWindow,
    cfg: DeskConfig
  ): void {
  const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Desk',
      submenu: [
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
          role: 'close',
        },
        {
          role: 'quit',
        },
      ],
    },
    {
      id: 'apps',
      label: 'Application',
      submenu: [],
    },
    {
      role: 'window',
      submenu: [
        {
          role: 'zoomIn',
        },
        {
          role: 'zoomOut',
        },
        {
          role: 'resetZoom',
        },
        {
          type: 'separator',
        },
        {
          role: 'minimize',
        },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'License',
        },
        {
          label: 'Privacy Statement',
        },
        {
          type: 'separator',
        },
        {
          label: 'About',
        },
      ],
    },
  ];

  const appMenu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(appMenu);

  //
  // Append list of configured applications.
  //
  const appList = Menu.getApplicationMenu().getMenuItemById('apps');

  cfg.apps.forEach((arg: DeskApp) => {
    appList.submenu.append(new MenuItem({
      label: arg.label,
      click: async () => {
        await win.loadURL(arg.url);
      },
    }));
  });
}
