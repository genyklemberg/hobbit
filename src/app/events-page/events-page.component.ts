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
import {MdSnackBar} from '@angular/material';
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
  minDate = new Date();
  // left column
  name: string;
  event_type: string;
  event_types = [
    {value: 'sport', viewValue: 'Sport'},
    {value: 'casual', viewValue: 'Casual'},
    {value: 'puzzle', viewValue: 'Puzzle'},
    {value: 'box', viewValue: 'Box'},
  ];
  city: string;
  cities = [
    {value: 'lviv', viewValue: 'Lviv'},
    {value: 'odesa', viewValue: 'Odesa'},
    {value: 'kyiv', viewValue: 'Kyiv'}
  ];
  district: string;
  districts = [
    {value: 'Frankivskiy', viewValue: 'Frankivskiy'},
    {value: 'Galitskiy', viewValue: 'Galitskiy'},
    {value: 'Shevchenkivskiy', viewValue: 'Shevchenkivskiy'},
  ];
  event_category: string;
  event_categories = [
    {value: 'casual', viewValue: 'Casual'},
    {value: 'tournament', viewValue: 'Tournament'},
  ];
  // right column
  description: string;
  event_mode: string;
  event_modes = [
    {value: 'single', viewValue: 'Single'},
    {value: 'team', viewValue: 'Team'},
  ];
  date: Date;
  time: string;
  price: string;
  constructor(public snackBar: MdSnackBar, private telegramService: TelegramService, private eventService: EventService, private dialog: MdDialog,  private fb: FormBuilder, public ERRORS: Constants){
    this.newEventForm = fb.group(
      {
        // left column
        'name': [this.name, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        'event_type': [this.event_type, Validators.required],
        'city': [this.city, Validators.required],
        'district': [this.district, Validators.required],
        'event_category': [this.event_category, Validators.required],
        // right column
        'description': [this.description, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])],
        'event_mode': [this.event_mode, Validators.required],
        'date': [this.date, Validators.required],
        'time': [this.time, Validators.required],
        'price': [this.price, Validators.required],
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
    // left column
    this.name = post.name;
    this.event_type = post.event_type;
    this.city = post.city;
    this.district = post.district;
    this.event_category = post.event_category;
    // right column
    this.description = post.description;
    this.event_mode = post.event_mode;
    this.date = post.date;
    this.time = post.time;
    this.price = post.price;
    this.addEvent(this.name, this.event_type, this.city, this.district, this.event_category, this.description, this.event_mode, this.date, this.time, this.price);
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

  addEvent(name, event_type, city, district, event_category, description, event_mode, date, time, price) {
    //TODO: add form validation
    this.newEvent = {
      // left column
      name,
      event_type,
      city,
      district,
      event_category,
      // right column
      description,
      event_mode,
      date,
      time,
      price
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
    if(!(event.date instanceof Date)){
      event.date = new Date(event.date)
    }
    let dialogRef = this.dialog.open(EditEventDialogComponent)
    dialogRef.componentInstance.event = event;
  }

  private _resetNewEventObj() {
    let event: Event = {
      // left column
      name: '',
      event_type: '',
      city: '',
      district: '',
      event_category: '',
      // right column
      description: '',
      event_mode: '',
      date: new Date(),
      time: '',
      price: ''
    };
    return event;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


}

