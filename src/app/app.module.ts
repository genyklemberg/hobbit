import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthProvider } from 'angularfire2/auth';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from '@angular/core';
import {MdListModule, MdButtonToggleModule, MdSelectModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule, MdTabsModule, MdDialogModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginDialogComponent } from './modals/login-dialog/login-dialog.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { EditEventDialogComponent } from './events-page/edit-event-dialog/edit-event-dialog.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfilePictureCropper, PictureCropper } from './my-profile/profile-picture-cropper/profile-picture-cropper';
import { GlobalErrorHandler } from './global-error-handler';
import { DialogsService, ConfirmDialog, AlertDialog, PromptDialog } from './common/dialogs.service';
import { Logger } from 'angular2-logger/core';
import { HttpModule } from '@angular/http';

import { config } from './config/firebase.config';
import { HbHomePageComponent } from './hb-home-page/hb-home-page.component';
import { DailyEventVidgetComponent } from './common/daily-event-vidget/daily-event-vidget.component';


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
    MyProfileComponent,
    PictureCropper,
    ImageCropperComponent,
    HbHomePageComponent,
    DailyEventVidgetComponent
  ],
  entryComponents:[
    LoginDialogComponent,
    ConfirmDialog,
    AlertDialog,
    PromptDialog,
    PictureCropper,
    EditEventDialogComponent
    ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    MaterialModule,
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule, 
    MdIconModule, 
    MdInputModule, 
    MdTabsModule,
    MdGridListModule,
=======
    MdListModule, MdSelectModule, MdButtonToggleModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule, MdTabsModule, MdDialogModule, MdDatepickerModule, MdNativeDateModule,
>>>>>>> acfdca6faccaec2797cf7e5b372b2682963a1d91
    MdDialogModule,
    MdDatepickerModule,
    MdNativeDateModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AngularFireAuthProvider,
    // {provide: ErrorHandler, useClass: GlobalErrorHandler},
    Logger,
    DialogsService,
    ProfilePictureCropper
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
