import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent } from './events-page/events-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { HbHomePageComponent } from './hb-home-page/hb-home-page.component';
import { DailyEventVidgetComponent } from './common/daily-event-vidget/daily-event-vidget.component'


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
        path: 'my-profile', 
        component: MyProfileComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
