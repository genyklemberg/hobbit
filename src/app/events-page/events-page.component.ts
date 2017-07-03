import { Component, OnInit } from '@angular/core';
import { Event } from '../interfaces/event';
import { EventService } from '../services/event/event.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  providers: [EventService, AngularFireDatabase]
})
export class EventsPageComponent implements OnInit {
  events: Array<Event>
  constructor(private eventService: EventService) { }

  ngOnInit() {
    //this.eventService.addEvent({name:'Event 1', description: 'Event 1 description', date: new Date()});
    this.eventService.getEvents().subscribe(events => {
      this.events = events
      console.log(this.events)
      // key for delete or update event -Ko7Hg0s_pmNAMHAs3t_
      console.log(this.events[0]['$key'])
    });
  }

  pageTitle =  'Events';
}
