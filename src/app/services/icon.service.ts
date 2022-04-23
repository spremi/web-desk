import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { IconInfo, IconSet } from '@models/icon-info';

/**
 * List of icons used.
 */
export const AppIcons: IconSet = {
  path: 'assets/icons/',
  list: [
    {
      icon: 'add',
      file: 'add-24px.svg',
    },
    {
      icon: 'anchor',
      file: 'anchor-24px.svg',
    },
    {
      icon: 'app_edit',
      file: 'app_registration-24px.svg',
    },
    {
      icon: 'app_view',
      file: 'apps-24px.svg',
    },
    {
      icon: 'category',
      file: 'category-24px.svg',
    },
    {
      icon: 'info',
      file: 'info-24px.svg',
    },
    {
      icon: 'license',
      file: 'receipt_long-24px.svg',
    },
    {
      icon: 'settings',
      file: 'settings-24px.svg',
    },
    {
      icon: 'style',
      file: 'style-24px.svg',
    },
    {
      icon: 'view_all',
      file: 'filter_alt_off-24px.svg',
    },
    {
      icon: 'view_compact',
      file: 'density_small-24px.svg',
    },
    {
      icon: 'view_group',
      file: 'list_alt-24px.svg',
    },
    {
      icon: 'view_normal',
      file: 'density_medium-24px.svg',
    },
    {
      icon: 'view_select',
      file: 'filter_alt-24px.svg',
    },
    {
      icon: 'view_seq',
      file: 'notes-24px.svg',
    },
  ],
};

export const ActionIcons: IconSet = {
  path: 'assets/icons/',
  list: [
    {
      icon: 'close',
      file: 'close-24px.svg',
    },
    {
      icon: 'delete',
      file: 'delete-24px.svg',
    },
    {
      icon: 'edit',
      file: 'create-24px.svg',
    },
    {
      icon: 'max',
      file: 'expand_less-24px.svg',
    },
    {
      icon: 'min',
      file: 'expand_more-24px.svg',
    },
    {
      icon: 'start',
      file: 'play_arrow-24px.svg',
    },
    {
      icon: 'stop',
      file: 'stop-24px.svg',
    },
    {
      icon: 'toggle_off',
      file: 'toggle_off-24px.svg',
    },
    {
      icon: 'toggle_on',
      file: 'toggle_on-24px.svg',
    },
    {
      icon: 'view',
      file: 'article-24px.svg',
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class IconService {

  constructor(
    private registry: MatIconRegistry,
    private sanitizer: DomSanitizer) { }

  register(): void {
    this.registerSet(AppIcons);
    this.registerSet(ActionIcons);
  }

  /**
   * Register icons in the specified set.
   */
  private registerSet(icons: IconSet): void {
    if (icons.list.length === 0) {
      return;
    }

    icons.list.forEach((arg: IconInfo) => {
      const iconPath = (icons.path + '/' + arg.file).replace('//', '/');

      this.registry.addSvgIcon(
        arg.icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(iconPath));
    });
  }
}
