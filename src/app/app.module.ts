import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthProvider } from 'angularfire2/auth';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import {MaterialModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent, LoginDialogComponent } from './navigation/navigation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EventsPageComponent } from './events-page/events-page.component';

const firebaseConfig = {
    apiKey: "AIzaSyB0qe7KDdI4egndAOCuLVa2YXicXAW-cPU",
    authDomain: "hobbit-61211.firebaseapp.com",
    databaseURL: "https://hobbit-61211.firebaseio.com",
    projectId: "hobbit-61211",
    storageBucket: "",
    messagingSenderId: "477217913064"
};

const appRouts: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  { 
    path: 'events', 
    component: EventsPageComponent,
    data: {pageTitle: 'Events from rounts'}
  },
  {
    path: 'my-profile', 
    component: UserProfileComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserProfileComponent,
    EventsPageComponent,
    LoginDialogComponent
  ],
  entryComponents:[LoginDialogComponent],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRouts),
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [AngularFireAuthProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
