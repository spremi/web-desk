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
 * IPC Requests from Angular to Electron.
 */
export abstract class IpcNg2E {
  static readonly GET_APPS      = 'get-apps';

  static readonly APP_CREATE    = 'app-create';
  static readonly APP_DELETE    = 'app-delete';
  static readonly APP_MODIFY    = 'app-modify';
  static readonly APP_LAUNCH    = 'app-launch';
  static readonly APP_CLOSE     = 'app-close';

  static readonly WIN_MINIMIZE  = 'win-minimize';
  static readonly WIN_RESTORE   = 'win-restore';
  static readonly WIN_CLOSE     = 'win-close';
}

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
