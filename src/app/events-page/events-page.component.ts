import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { EditEventDialogComponent } from './edit-event-dialog/edit-event-dialog.component';
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
  isAddEventMode: Boolean = false;
  newEvent = this._resetNewEventObj();

  constructor(private eventService: EventService, private dialog: MdDialog) { } 
  ngOnInit() {  
    this.events = [];  
    //this.eventService.addEvent({name:'Event 1', description: 'Event 1 description', date: new Date()});
    this.eventService.getEvents().subscribe(events => {
      this.events = events
      console.log(this.events)
      // key for delete or update event -Ko7Hg0s_pmNAMHAs3t_
      console.log(this.events[0]['$key'])
    });
  }

  addEvent(name, description, date){
    //TODO: add form validation
    if(!name && !description){
      return;
    }
    this.newEvent = {
      name,
      description,
      date: new Date()
    }

    this.eventService.addEvent(this.newEvent); 
    //TODO: need to implement return promise method if event added successfully
    this.newEvent = this._resetNewEventObj();
    console.log(this.newEvent);
  }

  deleteEvent(event: Event){
    this.eventService.deleteEvent(event.$key);
  }

  editEvent(event: Event){ 
    let dialogRef = this.dialog.open(EditEventDialogComponent)
    dialogRef.componentInstance.event = event;
  } 

  private _resetNewEventObj(){
    let event:Event = {
      name:'',
      description:'',
      date: new Date()
    };    
    return event;
  }


}

