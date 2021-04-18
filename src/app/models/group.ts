//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


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

  /** Label for the group. */
  label: string;
}

/**
 * Initializer for Group.
 */
export function initGroup(gid?: string, label?: string): Group {
  return {
    gid: (typeof gid === 'string' ? gid : GENERAL_ID),
    label: (typeof label === 'string' ? label : GENERAL_LABEL),
  };
}
