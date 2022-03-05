//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


/**
 * Run-time attributes of an application.
 */
export interface RuntimeAttrs {
  /** Application is running / stopped. */
  isRunning: boolean;

  /** Application is minimized / visible. */
  isMinimized: boolean;
}

/**
 * Describes map of application-id running applications.
 */
export interface AppRunAttrs {
  [aid: string]: RuntimeAttrs;
}

/**
 * Describes Unified app application state.
 */
export interface AppRunState {
  /** User can edit application? */
  canEdit: boolean;

  /** Map of running applications. */
  runApps: AppRunAttrs;
}

/**
 * Initializer for RuntimeAttrs.
 */
export const initRuntimeAttrs = (run?: boolean, min?: boolean): RuntimeAttrs => ({
  isRunning: run ? run : false,
  isMinimized: min ? min : false,
});

/**
 * Initializer for AppRunState.
 */
export const initAppRunState = (): AppRunState => ({
  canEdit: false,
  runApps: {} as AppRunAttrs,
});
