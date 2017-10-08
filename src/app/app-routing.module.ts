import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent } from './events-page/events-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
<<<<<<< HEAD
import { HbHomePageComponent } from './hb-home-page/hb-home-page.component';
import { DailyEventVidgetComponent } from './common/daily-event-vidget/daily-event-vidget.component'

=======
import {SearchPageComponent} from './search-page/search-page.component';
>>>>>>> 767e1cea9d786e7a879afae71f2d9a409b8f4d30

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
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
        path: 'my-profile', 
        component: MyProfileComponent
      }
    ]
=======
    redirectTo: '/events',
    pathMatch: 'full'
  },
  { 
    path: 'event/:key', 
    component: EventPageComponent,
    data: {pageTitle: 'Event details'}
  },
  { 
    path: 'events', 
    component: EventsPageComponent,
    data: {pageTitle: 'Events from routes'}
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'search-events',
    component: SearchPageComponent
>>>>>>> 767e1cea9d786e7a879afae71f2d9a409b8f4d30
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
