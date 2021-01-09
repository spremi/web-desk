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

  constructor(private ipcSvc: IpcService) { }

  /**
   * Load configuration data.
   */
  public init(): void {
    this.state = initAppRunState();

    this.run$.next(this.state.runApps);
  }

  /**
   * Set 'edit' flag.
   */
  public setEdit(flag: boolean): void {
    this.state.canEdit = flag;

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
}
