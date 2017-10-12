import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { EditEventDialogComponent } from './edit-event-dialog/edit-event-dialog.component';
import { Event } from '../interfaces/event';
import { EventService } from '../services/event/event.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { HostListener} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Constants }  from '../constants'
import { TelegramService } from '../services/telegram/telegram.service';

@Component({
  selector: 'hb-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  providers: [EventService, AngularFireDatabase, Constants, TelegramService]
})
export class EventsPageComponent implements OnInit {
  events: Array<Event>;
  isAddEventMode: Boolean = false;
  lazyLoadActive: boolean = true;
  lazyLoadStep: number = 10;
  event: Event;

  constructor( private telegramService: TelegramService, private eventService: EventService, private dialog: MdDialog,  private fb: FormBuilder, public ERRORS: Constants){

  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    if (this.lazyLoadActive){
      let tracker = $event.target.scrollingElement;
      let limit = tracker.scrollHeight - tracker.clientHeight;

      if (tracker.scrollTop + 1 >= limit) {
        this.eventService.getEvents(this.lazyLoadStep, { value: null , key: this.events[this.events.length - 1]['$key'] } ).subscribe(events => {
          events = events.slice(1, events.length);
          if (events.length > 0) {
            this.events.push(...events);
            if (events.length < this.lazyLoadStep - 1) {
              this.lazyLoadActive = false;
            }
          }
        });
      }

    }
  }



  ngOnInit() {
    this.events = [];
    //this.eventService.addEvent({name:'Event 1', description: 'Event 1 description', date: new Date()});
    this.eventService.getEvents(this.lazyLoadStep).subscribe(events => {
      this.events = events;
      console.log(this.events);
      // key for delete or update event -Ko7Hg0s_pmNAMHAs3t_
      console.log(this.events[0]['$key']);
    });
  }



  deleteEvent(event: Event){
    this.eventService.deleteEvent(event);
  }


  editEvent(event: Event){
    if(!(event.date instanceof Date)){
      event.date = new Date(event.date)
    }
    let dialogRef = this.dialog.open(EditEventDialogComponent)
    dialogRef.componentInstance.event = event;
  }

}

