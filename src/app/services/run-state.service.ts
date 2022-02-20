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
   * BehaviorSubject for 'edit' flag.
   */
  private edit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * BehaviorSubject for running desk applications.
   */
  private run$: BehaviorSubject<AppRunAttrs> = new BehaviorSubject<AppRunAttrs>({});

  private KEY_EDIT = 'edit';

  constructor(private ipcSvc: IpcService) { }

  /**
   * Load configuration data.
   */
  public init(): void {
    this.state = initAppRunState();

    this.state.canEdit = this.getFlagEdit();
    this.edit$.next(this.state.canEdit);

    this.run$.next(this.state.runApps);
  }

  /**
   * Set 'edit' flag.
   */
  public setEdit(flag: boolean): void {
    this.setFlagEdit(flag);

    this.state.canEdit = flag;
    this.edit$.next(this.state.canEdit);

    this.edit$.next(this.state.canEdit);
  }

  /**
   * Get observable to 'edit' flag.
   */
  public getEdit(): Observable<boolean> {
    return this.edit$.asObservable().pipe(
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
   * Get value of KEY_EDIT from local storage.
   */
  private getFlagEdit(): boolean {
    const v = localStorage.getItem(this.KEY_EDIT);

    return v === 'true';
  }

  /**
   * Set value of KEY_EDIT in local storage.
   */
  private setFlagEdit(flag: boolean): void {
    const v = (flag === true) ? 'true' : 'false';

    localStorage.setItem(this.KEY_EDIT, v);
  }
}
