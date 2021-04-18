//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


/*
 * Attributes of 'default' theme - based on Google's Basil.
 */
export const THEME_ID = '8cd73366-3fd2-4a69-8c37-93b6929f0e27';
const THEME_FILL = '#fffbe6';
const THEME_PRIMARY = '#37966f';
const THEME_ACCENT = '#fd5523';
const THEME_TEXT = '#356859';

/**
 * Describes simple theme constituents.
 */
export interface Theme {
  /** Unique identifier of the theme. */
  tid: string;

  /** Fill color. */
  fill: string;

  /** Primary color. */
  primary: string;

  /** Accent color. */
  accent: string;

  /** Text color. */
  text: string;
}

/**
 * Initializer for Theme.
 */
export function initTheme(
  tid?: string,
  fill?: string,
  primary?: string,
  accent?: string,
  text?: string
): Theme {
  return {
    tid: (typeof tid === 'string' ? tid : THEME_ID),
    fill: (typeof fill === 'string' ? fill : THEME_FILL),
    primary: (typeof primary === 'string' ? primary : THEME_PRIMARY),
    accent: (typeof accent === 'string' ? accent : THEME_ACCENT),
    text: (typeof text === 'string' ? text : THEME_TEXT),
  };
}
