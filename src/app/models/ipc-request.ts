//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


/**
 * Channel for IPC communication: Angular to Electron.
 */
export const IPC_NG2E = 'ng:ele';

/**
 * Channel for IPC communication: Electron to Angular.
 */
export const IPC_E2NG = 'ele:ng';

/**
 * Describes structure of IPC request from Angular to Electron.
 */
export interface IpcRequest {
  /** Key identifying the request. */
  reqKey: string;

  /** Additional params (if any) associated with key. */
  reqParams?: string[];

  /** Channel name used for response. */
  resChannel: string;
}

/**
 * Describes structure of IPC response from Electron to Angular.
 */
export interface IpcResponse {
  /** Status. */
  status: boolean;

  /** Data, if any. */
  data?: string;

  /** Is typeof(data) primitive? */
  type: string;
}

/**
 * Creates an instance of IpcRequest.
 */
export function initIpcRequest(key: string, params?: string[]): IpcRequest {
  return {
    reqKey: key,
    reqParams: (params ? params : null),
    resChannel: IPC_E2NG,
  };
}

/**
 * Creates an instance of IpcResponse.
 */
export function initIpcResponse(flag: boolean, arg?: any): IpcResponse {
  return {
    status: true,
    data: (arg ? (typeof(arg) === 'object' ? JSON.stringify(arg) : arg) : ''),
    type: (arg ? typeof(arg) : 'string'),
  };
}
