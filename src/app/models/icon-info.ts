//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


/**
 * Describes an icon.
 */
export interface IconInfo {
  /** Name of the icon - used in code. */
  readonly icon: string;

  /** Corresponding file name. */
  readonly file: string;
}

/**
 * Describes a set of icons at specific path.
 */
export interface IconSet {
  /** Path to base of icon set. */
  readonly path: string;

  /** List of icons in the set. */
  readonly list: IconInfo[];
}
