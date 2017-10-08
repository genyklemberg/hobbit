import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent } from './events-page/events-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { HbHomePageComponent } from './hb-home-page/hb-home-page.component';
import { DailyEventVidgetComponent } from './common/daily-event-vidget/daily-event-vidget.component'

=======
=======
import { HbHomePageComponent } from './hb-home-page/hb-home-page.component';
import { DailyEventVidgetComponent } from './common/daily-event-vidget/daily-event-vidget.component'
>>>>>>> bf6a12dc54657ea2204296363aa0628969157308
import {SearchPageComponent} from './search-page/search-page.component';
>>>>>>> 767e1cea9d786e7a879afae71f2d9a409b8f4d30

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bf6a12dc54657ea2204296363aa0628969157308
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
<<<<<<< HEAD
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
=======
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
>>>>>>> bf6a12dc54657ea2204296363aa0628969157308

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
