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
 * Describes a group of web applications.
 */
export interface DeskGroup {
  /** Unique identifier of the group. */
  gid: string;

  /** Label for the group. */
  label: string;

  /** Brief description of the group. */
  desc?: string;

  /** Sequence for relative placement. */
  seq: number;
}

/**
 * Describes stored configuration.
 */
export interface DeskConfig {
  /** Schema version. Useful for automatic updates. */
  ver: number;

  /** Current sequence number. Useful for display order. */
  seq: number;

  /** Array of desk application groups. */
  groups: DeskGroup[];

  /** Array of desk applications. */
  apps: DeskApp[];
}

/**
 * Initializer for DeskApp.
 */
export const initDeskApp = (
  aid?: string,
  gid?: string,
  seq?: number,
  label?: string,
  url?: string): DeskApp => ({
    aid: (typeof aid === 'string' ? aid : null),
    gid: (typeof gid === 'string' ? gid : null),
    seq: (typeof seq === 'number' ? seq : -1),
    label: (typeof label === 'string' ? label : null),
    url: (typeof url === 'string' ? url : null),
  });

/**
 * Check if object is a valid desk application.
 */
export const isDeskApp = (obj: DeskApp): boolean => {
  if (obj && obj.aid && obj.gid && obj.label && obj.url) {
    return true;
  }

  return false;
};

/**
 * Initializer for DeskGroup.
 */
export const initDeskGroup = (
  gid?: string,
  label?: string,
  desc?: string,
  seq?: number): DeskGroup => ({
    gid: (typeof gid === 'string' ? gid : null),
    label: (typeof label === 'string' ? label : null),
    desc: (typeof label === 'string' ? desc : null),
    seq: (typeof seq === 'number' ? seq : -1),
  });

/**
 * Initializer for DeskConfig.
 */
export const initDeskConfig = (): DeskConfig => ({
  ver: 0,
  seq: 0,
  groups: [],
  apps: [],
});

/**
 * Describes various events related to the web application.
 */
export abstract class DeskAppEvents {
  static readonly OPENED    = 'win-opened';
  static readonly CLOSED    = 'win-closed';
  static readonly MINIMIZED = 'win-minimized';
  static readonly RESTORED  = 'win-restored';
  static readonly HIDDEN    = 'win-hidden';
  static readonly VISIBLE   = 'win-visible';
}

/**
 * Describes event received from desk application.
 */
export interface DeskAppEvent {
  /** Event being notified. */
  event: DeskAppEvents;

  /** Id of desk application. */
  aid: string;

  /** Id of application window. */
  wid: number;
}

/**
 * Initializer for DeskAppEvent.
 */
export const initDeskAppEvent = (
  evt: DeskAppEvents,
  aid: string,
  wid: number): DeskAppEvent => ({
    event: (evt ? evt : null),
    aid: (typeof aid === 'string' ? aid : ''),
    wid: (typeof wid === 'number' ? wid : -1),
  });
