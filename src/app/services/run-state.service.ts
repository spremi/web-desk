import { Injectable } from '@angular/core';
import { initAppRunState, initRuntimeAttrs, AppRunState } from '@models/app-state';
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
   * BehaviorSubject for running desk applications.
   */
  private run$: BehaviorSubject<AppRunState> = new BehaviorSubject<AppRunState>(null);

  constructor(private ipcSvc: IpcService) { }

  /**
   * Load configuration data.
   */
  public init(): void {
    this.state = initAppRunState();

    this.run$.next(this.state);
  }

  /**
   * Get observable to map of application attributes.
   */
  public getApps(): Observable<AppRunState> {
    return this.run$.asObservable().pipe(
        filter(o => o !== null),
        distinctUntilChanged()
      );
  }

  /**
   * Set application state as 'OPEN'.
   */
  public appOpen(aid: string): void {
    const apps = { ...this.state };

    apps[aid] = initRuntimeAttrs(true, false);

    this.state = apps;

    this.run$.next(this.state);
  }

  /**
   * Set application state as 'CLOSED'.
   */
  public appClose(aid: string): void {
    const apps = { ...this.state };

    apps[aid] = initRuntimeAttrs(false, false);

    this.state = apps;

    this.run$.next(this.state);
  }

  /**
   * Set application window state.
   */
  public appMinimize(aid: string, flag: boolean): void {
    if (aid in this.state) {
      const apps = { ... this.state };

      apps[aid].isMinimized = flag;

      this.state = apps;

      this.run$.next(this.state);
    }
  }
}
