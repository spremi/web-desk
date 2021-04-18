//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { Group } from './group';
import { Theme } from './theme';

/**
 * Describes a web application.
 */
export interface DeskApp {
  /** Unique identifier of the application. */
  aid: string;

  /** Unique identifier of the group. */
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

  /** Array of groups. */
  groups: Group[];

  /** Array of themes. */
  themes: Theme[];

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
    groups: [],
    themes: [],
    apps: [],
  };
}

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
export function initDeskAppEvent(
  evt: DeskAppEvents,
  aid: string,
  wid: number
  ): DeskAppEvent {
  return {
    event: (evt ? evt : null),
    aid: (typeof aid === 'string' ? aid : ''),
    wid: (typeof wid === 'number' ? wid : -1),
  };
}
