//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


/**
 * Is logging enabled?
 */
let logEnabled = false;

/**
 * Initialize logger.
 */
export function initLogger(flag: boolean): void {
  logEnabled = flag;
}

/**
 * Log 'debug' message.
 */
export function logD(str: string): void {
  if (logEnabled) {
    console.log('[D] ' + str);
  }
}

/**
 * Log 'information' message.
 */
export function logI(str: string): void {
  if (logEnabled) {
    console.log('[I] ' + str);
  }
}

/**
 * Log warning.
 */
export function logW(str: string): void {
  console.log('[W] ' + str);
}

/**
 * Log 'error' message.
 */
export function logE(str: string): void {
  console.log('[E] ' + str);
}
