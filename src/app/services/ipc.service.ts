import { Injectable, NgZone } from '@angular/core';

import { IpcRequest, IpcResponse, IPC_NG2E } from '@models/ipc-request';
import { promise } from 'protractor';

/**
 * Extend window object to include custom additions in 'electron/preload.js'.
 */
interface EleWindow extends Window {
  /** The 'ipc' object. */
  ipc: any;
}

declare let window: EleWindow;

@Injectable({
  providedIn: 'root',
})
export class IpcService {
  private ipc = null;

  /**
   * Owing to the async nature of the IPC calls, the response channel must be
   * uniquely identified to ensure the appropriate promises are being resolved
   * or rejected.
   *
   * A sequence number - derived from this counter - is appended to identify
   * the response channel for each promise.
   */
  private counter = 0;

  constructor(private ngZone: NgZone) { }

  /**
   * Send message to electron renderer and return promise object for response.
   * Unique request-id is appended to both send & receive channels.
   *
   * The response from electron is always serialized.
   */
  async send<T>(arg: IpcRequest): Promise<T> {
    if (this.init()) {
      const reqId = this.seq();

      arg.resChannel += reqId;

      //
      // Create promise object for response from Electron.
      //
      const retPromise = new Promise<T>((resolve, reject) => {
        this.ngZone.run(async () => {
          this.ipc.receive(arg.resChannel, (event: any, response: string) => {
            let res: IpcResponse;

            try {
              res = JSON.parse(response);
            } catch (e) {
              res = null;
            }

            if (!res) {
              reject(new Error('IPC: Unable to parse response.'));
              return;
            }

            if (!res.status) {
              reject(new Error('IPC: Request failed.'));
              return;
            }

            if (res.type === 'object') {
              let data: T;

              try {
                data = JSON.parse(res.data);
                resolve(data);
              } catch (e) {
                reject(new Error('IPC: Unable to parse data in response.'));
              }
            } else {
              //
              // Resolve as primitive data type.
              //
              resolve(res.data as unknown as T);
            }
          });
        });
      });

      this.ipc.send(IPC_NG2E + reqId, arg);

      return retPromise;
    }
  }

  /**
   * One-time initialization of the IPC mechanism.
   */
  private init(): boolean {
    if (this.ipc) {
      return true;
    }

    if (window && window.ipc) {
      this.ipc = window.ipc;
    }

    if (this.ipc === null) {
        console.log('[E] Unable to initialize IPC');

        return false;
    }

    return true;
  }

  /**
   * Return sequence number for the IPC.
   */
  private seq(): string {
    if (this.counter > 999998) {
      this.counter = 0;
    } else {
      this.counter++;
    }

    return ':' + ('' + this.counter).padStart(6, '0');
  }
}
