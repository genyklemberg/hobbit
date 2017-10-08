import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Event} from '../../interfaces/event';
import {EventService} from '../../services/event/event.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Constants} from '../../constants'
import {TelegramService} from '../../services/telegram/telegram.service';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'hb-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [EventService, AngularFireDatabase, Constants, TelegramService]
})
export class AddEventComponent implements OnInit {
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
  constructor(public snackBar: MdSnackBar, private telegramService: TelegramService, private eventService: EventService, private dialog: MdDialog, private fb: FormBuilder, public ERRORS: Constants) {
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
        'lat': [this.lat, Validators.required],
        'lng': [this.lng, Validators.required]
      }
    );
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
    this.lat = post.lat;
    this.lng = post.lng;
    this.addEvent(this.name, this.event_type, this.city, this.district, this.event_category, this.description, this.event_mode, this.date, this.time, this.price, this.lat, this.lng);
    this.isAddEventMode = !this.isAddEventMode;
  }
  addEvent(name, event_type, city, district, event_category, description, event_mode, date, time, price, lat, lng) {
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
      price,
      lat,
      lng,
    }
    this.eventService.addEvent(this.newEvent);
    //TODO: need to implement return promise method if event added successfully
    this.newEvent = this._resetNewEventObj();
    console.log(this.newEvent);
    this.telegramService.sendMessage(name).subscribe(data => console.log(data), err => console.log(err));
  }
  private _resetNewEventObj() {
    let event: Event = {};
    return event;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  // Get coordinates from map
  public customStyle = [
    /* @formatter:off*/ {
      "featureType": "administrative", "elementType": "all", "stylers": [{"saturation": "-100"}]
    }, {
      "featureType": "administrative.province",
      "elementType": "all",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "simplified"}]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{"saturation": "-100"}]
    }, {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{"visibility": "simplified"}]
    }, {
      "featureType": "road.arterial",
      "elementType": "all",
      "stylers": [{"lightness": "30"}]
    }, {"featureType": "road.local", "elementType": "all", "stylers": [{"lightness": "40"}]}, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
    }, {"featureType": "water", "elementType": "labels", "stylers": [{"lightness": -25}, {"saturation": -100}]}
    // @formatter:on
  ];
  lat: number;
  lng: number;
  mapClicked($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }
  ngOnInit() {
  }
}
