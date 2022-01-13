import { Injectable } from '@angular/core';
import { initDeskApp, DeskApp, DeskConfig } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { initDeskGroup } from '../../../electron/src/models/desk-config';
import { IpcService } from './ipc.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private config: DeskConfig = null;

  private deskApps$: BehaviorSubject<DeskApp[]> = new BehaviorSubject<DeskApp[]>(null);

  constructor(private ipcSvc: IpcService) { }

  /**
   * Load configuration data.
   */
  public init(): void {
    const reqConfig = initIpcRequest(IpcNg2E.GET_APPS);

    this.ipcSvc.send<DeskConfig>(reqConfig).then(result => {
      if (result) {
        this.config = result;
        this.deskApps$.next(result.apps);
      } else {
        console.log('DataSvc: IPC failure.');
        this.dummy();
      }
    }).catch(err => {
        console.log(err);
        this.dummy();
    });
  }

  /**
   * Get observable to array of desk applications.
   */
  public getDeskApps(): Observable<DeskApp[]> {
    return this.deskApps$.asObservable().pipe(
        filter(c => c !== null),
        distinctUntilChanged()
      );
  }

  /**
   * Get desk application with specified id.
   */
  public getDeskApp(id: string): DeskApp {
    return this.config.apps.find(o => o.aid === id);
  }

  /**
   * Add new desk application.
   */
  public addDeskApp(app: DeskApp): void {
    const apps = [ ... this.config.apps, app ];

    this.config.apps = apps;

    this.deskApps$.next(apps);
  }

  /**
   * Modify desk application.
   */
  public modDeskApp(app: DeskApp): void {
    const apps = this.config.apps.map(o => o.aid === app.aid ? { ...app } : o);

    this.config.apps = apps;

    this.deskApps$.next(apps);
  }

  /**
   * Delete desk application.
   */
  public delDeskApp(id: string): void {
    const apps = this.config.apps.filter(o => o.aid !== id);

    this.config.apps = apps;

    this.deskApps$.next(apps);
  }

  /**
   * Provide dummy data. Useful for standalone development.
   * TODO: Remove after interface is ready.
   */
  private dummy(): void {
    this.config = {
      ver: 0,
      seq: 5,
      groups: [
        initDeskGroup(
          '0',
          'Group 0',
          'This is group 0',
          0
        ),
        initDeskGroup(
          '1',
          'Group 1',
          'This is group 1',
          1
        ),
        initDeskGroup(
          '2',
          'Group 2',
          'This is group 2',
          2
        ),
      ],
      apps: [
        initDeskApp(
          '3f229605-9c39-4cb2-ab9e-1851443a4264',
          '0',
          0,
          'Google',
          'https://www.google.com'),
        initDeskApp(
          'bfbd65d8-8d69-40d2-a08d-c387e74c3104',
          '0',
          0,
          'DuckDuckGo',
          'https://www.duckduckgo.com'),
        initDeskApp(
          '2e2f9377-3be2-4b83-a573-c997f82ff8c5',
          '0',
          0,
          'StartPage',
          'https://www.startpage.com'),
        initDeskApp(
          'e93aaccd-6720-45e0-b898-c41ae972db7e',
          '0',
          0,
          'Swiss Cows',
          'https://www.swisscows.com/'),
      ],
    };

    this.deskApps$.next(this.config.apps);
  }
}
