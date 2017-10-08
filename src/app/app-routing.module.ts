import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent } from './events-page/events-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { HbHomePageComponent } from './hb-home-page/hb-home-page.component';
import { DailyEventVidgetComponent } from './common/daily-event-vidget/daily-event-vidget.component'
import {SearchPageComponent} from './search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: HbHomePageComponent,
    children: [
      {
        path: 'event-vidget',
        component: DailyEventVidgetComponent
      },
      {
        path: 'events', 
        component: EventsPageComponent,
        data: {pageTitle: 'Events from rounts'}
      },
      { 
        path: 'event/:key', 
        component: EventPageComponent,
        data: {pageTitle: 'Event details'}
      },
      {
        path: 'my-profile', 
        component: MyProfileComponent
      },
      {
        path: 'search-events',
        component: SearchPageComponent
      }]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
