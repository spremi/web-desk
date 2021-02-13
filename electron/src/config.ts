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

import { v4 as uuidV4 } from 'uuid';

import * as fs from 'fs';
import * as path from 'path';

import { logE } from './logger';
import { initDeskApp, initDeskConfig, DeskApp, DeskConfig } from './models/desk-config';

/**
 * Directory containing the configuration.
 */
let ConfDir = __dirname;

/**
 * Application directory
 */
const AppDir = 'web-desk';

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
      logE(+ e.name + ' ' + e.message);

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
export function ensureConfig(packaged: boolean, dir: string): void {

  if (packaged) {
    ConfDir = path.join(dir, AppDir);

    try {
      fs.statSync(ConfDir);
    } catch (e) {
      fs.mkdirSync(ConfDir, '700');
    }
  } else {
    ConfDir = __dirname;
  }

  const cfgFile = path.join(ConfDir, ConfFile);

  try {
    fs.statSync(cfgFile);
  } catch (e) {
    if (e.code === 'ENOENT') {
      saveConfig(initDeskConfig());
    } else {
      logE(e.name + ' ' + e.message);
    }
  }
}

/**
 * Add desk application to configuration.
 */
export function addDeskApp(
  gid: string,
  label: string,
  url: string): DeskApp {
    const cfg = readConfig();

    if (!cfg) {
      return null;
    }

    const aid = uuidV4();
    const seq = cfg.seq++;

    const app = initDeskApp(aid, gid, seq, label, url);

    cfg.apps.push(app);

    if (saveConfig(cfg)) {
      return app;
    }

    return null;
}

/**
 * Get configuration of desk application with specified id.
 */
export function getDeskApp(id: string): DeskApp {
  const cfg = readConfig();

  if (!cfg) {
    return null;
  }

  const i = cfg.apps.findIndex((elem) =>
                elem !== null && typeof elem === 'object' && elem.aid === id);

  let app: DeskApp = null;

  if (i !== -1) {
    app = { ... cfg.apps[i] };
  }

  return app;
}

/**
 * Modify desk application to configuration.
 *
 * TODO: Re-order if 'seq' changes. For now, simply save as-is.
 */
export function modDeskApp(
  gid: string,
  aid: string,
  seq: number,
  label: string,
  url: string): DeskApp {
    const cfg = readConfig();

    if (!cfg) {
      return null;
    }

    const i = cfg.apps.findIndex((elem) =>
                  elem !== null && typeof elem === 'object' && elem.aid === aid);

    if (i === -1) {
      return null;
    }

    cfg.apps[i].gid = gid;
    cfg.apps[i].seq = seq;
    cfg.apps[i].label = label;
    cfg.apps[i].url = url;

    if (saveConfig(cfg)) {
      return getDeskApp(aid);
    }

    return null;
}

/**
 * Delete desk application to configuration.
 */
export function delDeskApp(aid: string): boolean {
  const cfg = readConfig();

  if (!cfg) {
    return null;
  }

  const apps = cfg.apps.filter((elem) =>
                elem !== null && typeof elem === 'object' && elem.aid !== aid);

  cfg.apps = apps;

  return saveConfig(cfg);
}
