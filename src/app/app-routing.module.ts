import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent } from './events-page/events-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {SearchPageComponent} from './search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
