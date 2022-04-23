import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initUiState, UiState } from '@models/ui-state';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {

  private KEY_EDIT = 'edit';
  private KEY_VIEW_COMPACT = 'view-compact';
  private KEY_VIEW_BY_GROUP = 'view-by-group';
  private KEY_VIEW_SEL_GROUPS = 'view-sel-groups';
  private KEY_SEL_GROUPS = 'sel-groups';

  private state: UiState = null;

  private state$: BehaviorSubject<UiState> = new BehaviorSubject<UiState>(null);

  constructor() { }

  /**
   * Initialize the state.
   */
  public init(): void {
    this.state = initUiState();

    this.state.canEdit = this.getInternalEdit();
    this.state.viewCompact = this.getInternalViewCompact();
    this.state.viewByGroup = this.getInternalViewByGroup();
    this.state.viewSelectedGroups = this.getInternalViewSelectedGroups();
    this.state.selectedGroups = this.getInternalSelectedGroups();

    this.state$.next(this.state);
  }

  /**
   * Get flag 'canEdit' from UI state.
   */
  public getEdit(): Observable<boolean> {
    return this.getState().pipe(
      map(o => o.canEdit)
    );
  }

  /**
   * Set flag 'canEdit' in UI state.
   */
  public setEdit(flag: boolean): void {
    this.setInternalEdit(flag);

    const newState = { ... this.state };
    newState.canEdit = flag;

    this.update(newState);
  }

  /**
   * Get flag 'viewSettings' from UI state.
   */
  public isViewSettings(): Observable<boolean> {
    return this.getState().pipe(
      map(o => o.viewSettings)
    );
  }

  /**
   * Set flag 'canEdit' in UI state.
   */
  public setViewSettings(flag: boolean): void {
    const newState = { ... this.state };
    newState.viewSettings = flag;

    this.update(newState);
  }

  /**
   * Get flag 'viewCompact' from UI state.
   */
  public isViewCompact(): Observable<boolean> {
    return this.getState().pipe(
      map(o => o.viewCompact)
    );
  }

  /**
   * Set flag 'viewCompact' in UI state.
   */
  public setViewCompact(flag: boolean): void {
    this.setInternalViewCompact(flag);

    const newState = { ... this.state };
    newState.viewCompact = flag;

    this.update(newState);
  }

  /**
   * Get flag 'viewByGroup' from UI state.
   */
  public isViewByGroup(): Observable<boolean> {
    return this.getState().pipe(
      map(o => o.viewByGroup)
    );
  }

  /**
   * Set flag 'viewByGroup' in UI state.
   */
  public setViewByGroup(flag: boolean): void {
    this.setInternalViewByGroup(flag);

    const newState = { ... this.state };
    newState.viewByGroup = flag;

    this.update(newState);
  }

  /**
   * Get flag 'viewSelectedGroups' from UI state.
   */
  public isViewSelectedGroups(): Observable<boolean> {
    return this.getState().pipe(
      map(o => o.viewSelectedGroups)
    );
  }

  /**
   * Set flag 'viewSelectedGroups' in UI state.
   */
  public setViewSelectedGroups(flag: boolean): void {
    this.setInternalViewSelectedGroups(flag);

    const newState = { ... this.state };
    newState.viewSelectedGroups = flag;

    this.update(newState);
  }

  /**
   * Get 'selectedGroups' from UI state.
   */
  public getSelectedGroups(): Observable<string[]> {
    return this.getState().pipe(
      map(o => o.selectedGroups)
    );
  }

  /**
   * Add application group to 'selectedGroups' in UI state.
   */
  public addSelectedGroup(gid: string): void {
    const groups = this.state.selectedGroups;

    if (!groups.includes(gid)) {
      const newState = { ... this.state };

      newState.selectedGroups.push(gid);
      this.update(newState);
    }
  }

  /**
   * Remove application group from 'selectedGroups' in UI state.
   */
  public delSelectedGroup(gid: string): void {
    const groups = this.state.selectedGroups;

    if (groups.includes(gid)) {
      const newState = { ... this.state };

      newState.selectedGroups = groups.filter(id => id !== gid);
      this.update(newState);
    }
  }

  /**
   * Get observable to UI state.
   */
  private getState(): Observable<UiState> {
    return this.state$.asObservable().pipe(
      filter(o => o !== null),
      distinctUntilChanged()
    );
  }

  /**
   * Update the state.
   */
  private update(newState: UiState): void {
    this.state = newState;
    this.state$.next(this.state);
  }

  /**
   * Get value of KEY_EDIT from local storage.
   */
  private getInternalEdit(): boolean {
    const v = localStorage.getItem(this.KEY_EDIT);

    return v === 'true';
  }

  /**
   * Set value of KEY_EDIT in local storage.
   */
  private setInternalEdit(flag: boolean): void {
    const v = (flag === true) ? 'true' : 'false';

    localStorage.setItem(this.KEY_EDIT, v);
  }

  /**
   * Get value of KEY_VIEW_COMPACT from local storage.
   */
  private getInternalViewCompact(): boolean {
    const v = localStorage.getItem(this.KEY_VIEW_COMPACT);
    return v === 'true';
  }

  /**
   * Set value of KEY_VIEW_SEL_GROUPS in local storage.
   */
  private setInternalViewCompact(flag: boolean): void {
    const v = (flag === true) ? 'true' : 'false';

    localStorage.setItem(this.KEY_VIEW_COMPACT, v);
  }

  /**
   * Get value of KEY_VIEW_BY_GROUP from local storage.
   */
  private getInternalViewByGroup(): boolean {
    const v = localStorage.getItem(this.KEY_VIEW_BY_GROUP);
    return v === 'true';
  }

  /**
   * Set value of KEY_VIEW_BY_GROUP in local storage.
   */
  private setInternalViewByGroup(flag: boolean): void {
    const v = (flag === true) ? 'true' : 'false';

    localStorage.setItem(this.KEY_VIEW_BY_GROUP, v);
  }

  /**
   * Get value of KEY_VIEW_SEL_GROUPS from local storage.
   */
  private getInternalViewSelectedGroups(): boolean {
    const v = localStorage.getItem(this.KEY_VIEW_SEL_GROUPS);
    return v === 'true';
  }

  /**
   * Set value of KEY_VIEW_SEL_GROUPS in local storage.
   */
  private setInternalViewSelectedGroups(flag: boolean): void {
    const v = (flag === true) ? 'true' : 'false';

    localStorage.setItem(this.KEY_VIEW_SEL_GROUPS, v);
  }

  /**
   * Get value of KEY_SEL_GROUPS from local storage.
   */
  private getInternalSelectedGroups(): string[] {
    const s = localStorage.getItem(this.KEY_SEL_GROUPS);

    let r: string[];

    if (s) {
      r = JSON.parse(s);
    } else {
      r = [];
    }

    return r;
  }

  /**
   * Set value of KEY_SEL_GROUPS in local storage.
   */
  private setInternalSelectedGroups(groups: string[]): void {
    localStorage.setItem(this.KEY_SEL_GROUPS, JSON.stringify(groups));
  }
}
