import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '@routes/about/about.component';
import { DeskAppComponent } from '@routes/desk-app/desk-app.component';
import { DeskGroupComponent } from '@routes/desk-group/desk-group.component';
import { GroupsComponent } from '@routes/groups/groups.component';
import { HomeComponent } from '@routes/home/home.component';
import { LicenseComponent } from '@routes/license/license.component';
import { SettingsComponent } from '@routes/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'license',
    component: LicenseComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'desk-app',
    component: DeskAppComponent,
  },
  {
    path: 'desk-group',
    component: DeskGroupComponent,
  },
  {
    path: 'groups',
    component: GroupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
