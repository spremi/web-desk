import { Injectable } from '@angular/core';
import { initAppRunState, initRuntimeAttrs, AppRunAttrs, AppRunState } from '@models/app-state';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { IpcService } from './ipc.service';

@Injectable({
  providedIn: 'root',
})
export class RunStateService {
  /**
   * Dynamic run-time information.
   */
  private state: AppRunState = null;

  /**
   * BehaviorSubject for 'show-settings' flag.
   */
  private showSettings$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // TODO: Consolidate multiple flags inside 'AppRunState'.

  /**
   * BehaviorSubject for running desk applications.
   */
  private run$: BehaviorSubject<AppRunAttrs> = new BehaviorSubject<AppRunAttrs>({});

  private KEY_SEL_GROUPS = 'sel-groups';
  private KEY_VIEW_SEL_GROUPS = 'view-sel-groups';

  /**
   * BehaviorSubject for selected groups.
   */
  private selectedGroups$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * BehaviorSubject for 'view selected groups only'.
   */
  private viewSelectedGroups$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private ipcSvc: IpcService) { }

  /**
   * Load configuration data.
   */
  public init(): void {
    this.state = initAppRunState();

    this.run$.next(this.state.runApps);

    this.initSelectedGroups();
    this.initViewSelectedGroups();
  }

  /**
   * Set 'show-settings' flag.
   */
  public showSettings(flag: boolean): void {
    this.showSettings$.next(flag);
  }

  /**
   * Get observable to 'show-settings' flag.
   */
  public isShowSettings(): Observable<boolean> {
    return this.showSettings$.asObservable().pipe(
      filter(o => o !== null),
      distinctUntilChanged()
    );
  }

  /**
   * Get observable to map of application attributes.
   */
  public getApps(): Observable<AppRunAttrs> {
    return this.run$.asObservable().pipe(
        filter(o => o !== null),
        distinctUntilChanged()
      );
  }

  /**
   * Get observable to array of selected application groups.
   */
  public getSelectedGroups(): Observable<string[]> {
    return this.selectedGroups$.asObservable().pipe(
        filter(o => o !== null),
        distinctUntilChanged()
      );
  }

  /**
   * Set application state as 'OPEN'.
   */
  public appOpen(aid: string): void {
    const apps = { ...this.state.runApps };

    apps[aid] = initRuntimeAttrs(true, false);

    this.state.runApps = apps;

    this.run$.next(this.state.runApps);
  }

  /**
   * Set application state as 'CLOSED'.
   */
  public appClose(aid: string): void {
    const apps = { ... this.state.runApps };

    apps[aid] = initRuntimeAttrs(false, false);

    this.state.runApps = apps;

    this.run$.next(this.state.runApps);
  }

  /**
   * Set application window state.
   */
  public appMinimize(aid: string, flag: boolean): void {
    if (aid in this.state.runApps) {
      const apps = {... this.state.runApps};

      apps[aid].isMinimized = flag;

      this.state.runApps = apps;

      this.run$.next(this.state.runApps);
    }
  }

  /**
   * Add application group to selection.
   */
  public addSelectedGroup(gid: string): void {
    const s = localStorage.getItem(this.KEY_SEL_GROUPS);
    let g: string[];
    let m: string[];

    if (s) {
      g = JSON.parse(s);

      m = [...g, gid];
    } else {
      m = [];
    }

    localStorage.setItem(this.KEY_SEL_GROUPS, JSON.stringify(m));

    this.selectedGroups$.next(m);
  }

  /**
   * Remove application group from selection.
   */
  public delSelectedGroup(gid: string): void {
    const s = localStorage.getItem(this.KEY_SEL_GROUPS);
    let g: string[];
    let m: string[];

    if (s) {
      g = JSON.parse(s);
      m = g.filter(id => id !== gid);
    } else {
      m = [];
    }

    localStorage.setItem(this.KEY_SEL_GROUPS, JSON.stringify(m));

    this.selectedGroups$.next(m);
  }

  /**
   * Set flag for 'view selected groups only'.
   */
  public setViewSelectedGroups(flag: boolean): void {
    this.setFlagViewSelectedGroups(flag);

    this.viewSelectedGroups$.next(flag);
  }

  /**
   * Get observable to flag for 'view selected groups only'.
   */
  public getViewSelectedGroups(): Observable<boolean> {
    return this.viewSelectedGroups$.asObservable().pipe(
      filter(o => o !== null),
      distinctUntilChanged()
    );
  }

  /**
   * Initialize selected groups from local storage.
   */
  private initSelectedGroups(): void {
    const s = localStorage.getItem(this.KEY_SEL_GROUPS);
    let g: string[];

    if (s) {
      g = JSON.parse(s);
    } else {
      g = [];
    }

    this.selectedGroups$.next(g);
  }

  /**
   * Get value of KEY_VIEW_SEL_GROUPS from local storage.
   */
  private getFlagViewSelectedGroups(): boolean {
    const v = localStorage.getItem(this.KEY_VIEW_SEL_GROUPS);
    return v === 'true';
  }

  /**
   * Set value of KEY_VIEW_SEL_GROUPS in local storage.
   */
  private setFlagViewSelectedGroups(flag: boolean): void {
    const v = (flag === true) ? 'true' : 'false';

    localStorage.setItem(this.KEY_VIEW_SEL_GROUPS, v);
  }

  /**
   * Initialize 'view-sel-groups' from local storage.
   */
  private initViewSelectedGroups(): void {
    const isEnabled = this.getFlagViewSelectedGroups();

    this.viewSelectedGroups$.next(isEnabled);
  }
}
