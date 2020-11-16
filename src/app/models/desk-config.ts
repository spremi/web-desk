//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


/**
 * Describes a web application.
 */
export interface DeskApp {
  /** Unique identifier of the application. */
  aid: string;

  /** Unique identifier of the group. (For future use) */
  gid: string;

  /** Sequence for relative placement. */
  seq: number;

  /** Label for the web application. */
  label: string;

  /** URL of the web application. */
  url: string;
}

/**
 * Describes stored configuration.
 */
export interface DeskConfig {
  /** Schema version. Useful for automatic updates. */
  ver: number;

  /** Current sequence number. Useful for display order. */
  seq: number;

  /** Array of desk applications. */
  apps: DeskApp[];
}

/**
 * Initializer for DeskApp.
 */
export function initDeskApp(
  aid?: string,
  gid?: string,
  seq?: number,
  label?: string,
  url?: string): DeskApp {
  return {
    aid: (typeof aid === 'string' ? aid : null),
    gid: (typeof gid === 'string' ? gid : null),
    seq: (typeof seq === 'number' ? seq : -1),
    label: (typeof label === 'string' ? label : null),
    url: (typeof url === 'string' ? url : null),
  };
}

/**
 * Initializer for DeskConfig.
 */
export function initDeskConfig(): DeskConfig {
  return {
    ver: 0,
    seq: 0,
    apps: [],
  };
}
