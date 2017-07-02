import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthProvider } from 'angularfire2/auth';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import {MaterialModule} from '@angular/material';
import {FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent, LoginDialogComponent } from './navigation/navigation.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

import { config } from './config/firebase.config';

const firebaseConfig = config;

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EventsPageComponent,
    LoginDialogComponent,
    MyProfileComponent
  ],
  entryComponents:[LoginDialogComponent],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [AngularFireAuthProvider],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
