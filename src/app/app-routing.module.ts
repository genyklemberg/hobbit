import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent } from './events-page/events-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [
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
    component: MyProfileComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
