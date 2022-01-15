import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconService } from '@services/icon.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './parts/body/body.component';
import { DeskAppEditComponent } from './parts/desk-app-edit/desk-app-edit.component';
import { DeskAppViewComponent } from './parts/desk-app-view/desk-app-view.component';
import { FooterComponent } from './parts/footer/footer.component';
import { HeaderComponent } from './parts/header/header.component';
import { IconComponent } from './parts/icon/icon.component';
import { WidgetComponent } from './parts/widget/widget.component';
import { AboutComponent } from './routes/about/about.component';
import { DeskAppComponent } from './routes/desk-app/desk-app.component';
import { DeskGroupComponent } from './routes/desk-group/desk-group.component';
import { HomeComponent } from './routes/home/home.component';
import { LicenseComponent } from './routes/license/license.component';
import { SettingsComponent } from './routes/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    LicenseComponent,
    SettingsComponent,
    DeskAppViewComponent,
    DeskAppEditComponent,
    DeskAppComponent,
    WidgetComponent,
    IconComponent,
    DeskGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconSvc: IconService) {
    this.iconSvc.register();
  }
}
