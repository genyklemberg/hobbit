import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthProvider } from 'angularfire2/auth';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import {MaterialModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent, LoginDialogComponent } from './navigation/navigation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { EditEventDialogComponent } from './events-page/edit-event-dialog/edit-event-dialog.component';

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
    LoginDialogComponent,
    EditEventDialogComponent
  ],
  entryComponents:[
    LoginDialogComponent,
    EditEventDialogComponent
    ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
    MdDatepickerModule, MdNativeDateModule,
    FormsModule,
    RouterModule.forRoot(appRouts),
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [AngularFireAuthProvider],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
