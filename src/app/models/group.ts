//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


import { THEME_ID } from './theme';

/*
 * Attributes of 'default' general group.
 */
export const GENERAL_ID = '3d6bce4b-c405-4b1c-a981-ee62462eeddb';
const GENERAL_LABEL = 'General';

/**
 * Describes a group of web applications.
 */
export interface Group {
  /** Unique identifier of the group. */
  gid: string;

  /** Unique identifier of the theme. */
  tid: string;

  /** Label for the group. */
  label: string;
}

/**
 * Initializer for Group.
 */
export function initGroup(gid?: string, tid?: string, label?: string): Group {
  return {
    gid: (typeof gid === 'string' ? gid : GENERAL_ID),
    tid: (typeof tid === 'string' ? tid : THEME_ID),
    label: (typeof label === 'string' ? label : GENERAL_LABEL),
  };
}
