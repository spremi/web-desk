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
  label: string;
  url: string;
}

/**
 * Describes stored configuration.
 */
export interface DeskConfig {
  apps: DeskApp[];
}

/**
 * Initializer for DeskConfig
 */
export function initDeskConfig(): DeskConfig {
  return {
    apps: [],
  };
}
