//
// @project     web-desk
//
// @author      Sanjeev Premi <spremi@ymail.com>
//
// @license     BSD-3-Clause
//


/**
 * Describes the unified UI state.
 */
export interface UiState {
  /** User can edit groups & applications? */
  canEdit: boolean;

  /** View settings? */
  viewSettings: boolean;

  /** View widgets in compact mode? */
  viewCompact: boolean;

  /** View by group? */
  viewByGroup: boolean;

  /** View selected groups only? */
  viewSelectedGroups: boolean;

  /** Selected groups. */
  selectedGroups: string[];
}

/**
 * Initializer for UiState.
 */
export const initUiState = (): UiState => ({
  canEdit: false,
  viewSettings: false,
  viewCompact: false,
  viewByGroup: false,
  viewSelectedGroups: false,
  selectedGroups: [],
});
