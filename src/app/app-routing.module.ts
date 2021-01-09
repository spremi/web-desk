import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '@routes/about/about.component';
import { DeskAppComponent } from '@routes/desk-app/desk-app.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
