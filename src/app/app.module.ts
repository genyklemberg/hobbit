import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthProvider } from 'angularfire2/auth';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from '@angular/core';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent, LoginDialogComponent } from './navigation/navigation.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { EditEventDialogComponent } from './events-page/edit-event-dialog/edit-event-dialog.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { GlobalErrorHandler } from './global-error-handler';
import { DialogsService, ConfirmDialog, AlertDialog, PromptDialog } from './common/dialogs.service';
import { Logger } from "angular2-logger/core";

import { config } from './config/firebase.config';

const firebaseConfig = config;

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EventsPageComponent,
    LoginDialogComponent,
    ConfirmDialog,
    AlertDialog,
    PromptDialog,
    EditEventDialogComponent,
    MyProfileComponent
  ],
  entryComponents:[
    LoginDialogComponent,
    ConfirmDialog,
    AlertDialog,
    PromptDialog,
    EditEventDialogComponent
    ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [AngularFireAuthProvider,
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    Logger,
    DialogsService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
