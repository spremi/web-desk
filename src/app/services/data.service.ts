import { Injectable } from '@angular/core';
import { initDeskApp, DeskApp, DeskConfig, DeskGroup } from '@models/desk-config';
import { initDeskGroup } from '@models/desk-config';
import { initIpcRequest, IpcNg2E } from '@models/ipc-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { IpcService } from './ipc.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private config: DeskConfig = null;

  private deskGroups$: BehaviorSubject<DeskGroup[]> = new BehaviorSubject<DeskGroup[]>(null);
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
        this.deskGroups$.next(result.groups);
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
   * Get observable to array of desk applications.
   */
  public getDeskGroups(): Observable<DeskGroup[]> {
    return this.deskGroups$.asObservable().pipe(
      filter(c => c !== null),
      distinctUntilChanged()
    );
  }

  /**
   * Get desk group with specified id.
   */
  public getDeskGroup(id: string): DeskGroup {
    return this.config.groups.find(o => o.gid === id);
  }

  /**
   * Add new desk application group.
   */
  public addDeskGroup(group: DeskGroup): void {
    const groups = [... this.config.groups, group];

    this.config.groups = groups;

    this.deskGroups$.next(groups);
  }

  /**
   * Modify desk application group.
   */
  public modDeskGroup(group: DeskGroup): void {
    const groups = this.config.groups.map(o => o.gid === group.gid ? { ...group } : o);

    this.config.groups = groups;

    this.deskGroups$.next(groups);
  }

  /**
   * Delete desk application.
   */
  public delDeskGroup(id: string): void {
    const groups = this.config.groups.filter(o => o.gid !== id);

    this.config.groups = groups;

    this.deskGroups$.next(groups);
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
          'f2e4ad07-10ad-4dc1-b251-65b568157048',
          'Group 0',
          'This is group 0',
          0
        ),
        initDeskGroup(
          '22b6bee4-d05d-4f20-ba7f-25de7fb5aee2',
          'Group 1',
          'This is group 1',
          1
        ),
        initDeskGroup(
          '08fd0aa2-3a5f-413f-b518-b4072958ddd4',
          'Group 2',
          'This is group 2',
          2
        ),
      ],
      apps: [
        initDeskApp(
          '3f229605-9c39-4cb2-ab9e-1851443a4264',
          'f2e4ad07-10ad-4dc1-b251-65b568157048',
          0,
          'Google',
          'https://www.google.com'),
        initDeskApp(
          'bfbd65d8-8d69-40d2-a08d-c387e74c3104',
          '22b6bee4-d05d-4f20-ba7f-25de7fb5aee2',
          0,
          'DuckDuckGo',
          'https://www.duckduckgo.com'),
        initDeskApp(
          '2e2f9377-3be2-4b83-a573-c997f82ff8c5',
          '22b6bee4-d05d-4f20-ba7f-25de7fb5aee2',
          0,
          'StartPage',
          'https://www.startpage.com'),
        initDeskApp(
          'e93aaccd-6720-45e0-b898-c41ae972db7e',
          'f2e4ad07-10ad-4dc1-b251-65b568157048',
          0,
          'Swiss Cows',
          'https://www.swisscows.com/'),
      ],
    };

    this.deskGroups$.next(this.config.groups);
    this.deskApps$.next(this.config.apps);
  }
}
