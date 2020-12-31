//
// @project     web-desk
//
// @author      Sanjeev Premi
//
// @license     BSD-3-Clause
//

//
// All NodeJS APIs are available here.
// The process runs in the same sandbox as a Chrome Extension.
//

import { contextBridge, ipcRenderer } from 'electron';
import { IpcRequest, IPC_E2NG, IPC_NG2E } from './models/ipc-request';

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  //
  // Fill version numbers in 'index.html'.
  //
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});

/**
 * Send requests from Angular application.
 */
function ipcSend(channel: string, data: IpcRequest): void {
  if (channel.startsWith(IPC_NG2E)) {
    //
    // Map to common handler (ignoring sequence number).
    //
    ipcRenderer.send(IPC_NG2E, data);
  } else {
    console.log('[E] Unknown IPC channel (send) - ' + channel + '.');
  }
}

/**
 * Receive response from Electron.
 */
function ipcReceive(channel: string, func: () => void): void {
  if (channel.startsWith(IPC_E2NG)) {
    ipcRenderer.once(channel, func);
  } else {
    console.log('[E] Unknown IPC channel (receive) - ' + channel + '.');
  }
}

function ipcListen(channel: string, func: () => void): void {
  if (channel.startsWith(IPC_E2NG)) {
    ipcRenderer.on(channel, func);
  } else {
    console.log('[E] Unknown IPC channel (listen) - ' + channel + '.');
  }
}

//
// Expose custom 'ipc' object via 'window' object.
//
contextBridge.exposeInMainWorld(
  'ipc', {
    send: ipcSend,
    receive: ipcReceive,
    listen: ipcListen,
    }
);
