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
  newEvent = this._resetNewEventObj();
  lazyLoadActive: boolean = true;
  lazyLoadStep: number = 10;
  event: Event;
  newEventForm: FormGroup;
  name:string;
  description: string;
  date: Date;
  startDate: Date;
  endDate: Date;
  location: string;
  comment: string;
  minDate = new Date();
  constructor(private telegramService: TelegramService, private eventService: EventService, private dialog: MdDialog,  private fb: FormBuilder, public ERRORS: Constants){
    this.newEventForm =fb.group( 
      {
        'name': [this.name, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        'description': [this.description, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])],
        'startDate': [this.startDate, Validators.required],
        'endDate': [this.endDate, Validators.required],
        'location': [this.location, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(500)])],
        'comment': [this.comment, Validators.compose([Validators.maxLength(500)])]   
      }
    );
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
  
  newEventPost(post) {
    this.name = post.name;
    this.startDate = post.startDate;
    this.endDate = post.endDate;
    this.description = post.description;
    this.location = post.location;
    this.comment = post.comment;
    this.addEvent(this.name, this.startDate, this.endDate, this.description,
      this.location, this.comment);
    this.isAddEventMode = !this.isAddEventMode;
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

  addEvent(name, startDate, endDate, description, location, comment){
    //TODO: add form validation
    this.newEvent = {
      name,
      startDate,
      endDate,
      description,
      location,
      comment
    }

    this.eventService.addEvent(this.newEvent);
    //TODO: need to implement return promise method if event added successfully
    this.newEvent = this._resetNewEventObj();
    console.log(this.newEvent);
    this.telegramService.sendMessage(name).subscribe( data => console.log(data), err => console.log(err) );
  }

  deleteEvent(event: Event){
    this.eventService.deleteEvent(event.$key);
  }


  editEvent(event: Event){ 
    if(event.startDate!=null && !(event.startDate instanceof Date)){
      event.startDate = new Date(event.startDate)
    }
    if(event.endDate!=null && !(event.endDate instanceof Date)){
      event.endDate = new Date(event.endDate)
    }
    let dialogRef = this.dialog.open(EditEventDialogComponent)
    dialogRef.componentInstance.event = event;
  }

  private _resetNewEventObj(){
    let event:Event = {
      name:'',
      date: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      description:'',
      location:'',
      comment:'',
    };
    return event;
  }


}

