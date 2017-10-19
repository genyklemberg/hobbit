import {Component, OnInit,} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {EventService} from '../../services/event/event.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Constants} from '../../constants';
import {TelegramService} from '../../services/telegram/telegram.service';
import {Map} from '../../common/map-options';
import {EventForm} from '../../common/event-form.model';
import {FormFields} from '../../constants/form-fields.constants';


@Component({
  selector: 'hb-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [EventService, AngularFireDatabase, Constants, FormFields, TelegramService, Map, EventForm]
})


export class AddEventComponent implements OnInit {
  isAddEventMode: Boolean = false;
  newEvent: any;
  newEventForm: FormGroup;
  // left column
  name: string;
  event_type: string;
  city: string;
  district: string;
  event_category: string;
  // right column
  description: string;
  event_mode: string;
  date: Date;
  time: string;
  price: string;
  lat: number;
  lng: number;

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
    this.addEvent(
      this.name,
      this.event_type, this.city,
      this.district, this.event_category,
      this.description,
      this.event_mode,
      this.date,
      this.time,
      this.price,
      this.lat,
      this.lng);
    this.isAddEventMode = !this.isAddEventMode;
  }

  constructor(public snackBar: MdSnackBar,
              private telegramService: TelegramService,
              private eventService: EventService,
              private fb: FormBuilder,
              public ERRORS: Constants,
              public map: Map,
              public eventForm: EventForm,
              public fields: FormFields) {
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
        'time': [this.time],
        'price': [this.price],
        'lat': [this.lat, Validators.required],
        'lng': [this.lng, Validators.required]
      }
    );
  }

  addEvent(name, event_type, city, district, event_category, description, event_mode, date, time, price, lat, lng) {
    // TODO: add form validation
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
    // TODO: need to implement return promise method if event added successfully
    console.log(this.newEvent);
    this.telegramService.sendMessage(name).subscribe(data => console.log(data), err => console.log(err));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  loadDistrict($event, city) {
    this.newEventForm.get('district').enable();
    // load districts of selected citie
    this.eventForm.districts = this.eventForm.locations.find(value => value.value === city).districts;

    // centering map
    this.map.center_lat = this.eventForm.locations.find(value => value.value === city).center_lat;
    this.map.center_lng = this.eventForm.locations.find(value => value.value === city).center_lng;
  };

  // Get coordinates from map
  mapClicked($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  ngOnInit() {
  }
}


