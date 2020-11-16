//
// @project     web-desk
//
// @author      Sanjeev Premi
//
// @license     BSD-3-Clause
//

//
// Application level configuration.
//

import * as fs from 'fs';
import * as path from 'path';

import { initDeskConfig, DeskConfig } from './models/desk-config';

/**
 * Directory containing the configuration.
 */
const ConfDir = __dirname;

/**
 * Configuration file.
 */
const ConfFile = 'config.json';

/**
 * Read configuration.
 */
export function readConfig(): DeskConfig {
  const cfgFile = path.join(ConfDir, ConfFile);

  let cfg: DeskConfig = null;
  let err = false;

  if (fs.existsSync(cfgFile)) {
    const cfgStr = fs.readFileSync(cfgFile, 'utf8');

    try {
      cfg = JSON.parse(cfgStr);
    } catch (e) {
      console.log('[E] : ' + e.name + ' ' + e.message);

      err = true;
    }
  }

  if (err) {
    return initDeskConfig();
  }

  return cfg;
}

/**
 * Save configuration.
 */
export function saveConfig(cfg: DeskConfig): boolean {
  if (!cfg) {
    return false;
  }

  let ret = true;

  try {
    const cfgFile = path.join(ConfDir, ConfFile);
    fs.writeFileSync(cfgFile, JSON.stringify(cfg, null, 2), 'utf8');
  } catch (e) {
    ret = false;
  }

  return ret;
}

/**
 * Ensure that configuration file exists.
 * If it doesn't, create one.
 */
export function ensureConfig(): void {
  const cfgFile = path.join(ConfDir, ConfFile);

  try {
    fs.statSync(cfgFile);
  } catch (e) {
    if (e.code === 'ENOENT') {
      saveConfig(initDeskConfig());
    } else {
      console.log('[E] : ' + e.name + ' ' + e.message);
    }
  }
}
