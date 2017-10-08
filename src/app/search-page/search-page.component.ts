import {Component, OnInit} from '@angular/core';
import {EventService} from '../services/event/event.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Event} from '../interfaces/event';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'hb-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  providers: [EventService, AngularFireDatabase]
})
export class SearchPageComponent implements OnInit {
  events: Array<Event>;
  startAt = new Subject();
  endAt = new Subject();
  event: Event;
  lastKeypress: number = 0;
  // left column
  event_types = [
    {value: 'sport', viewValue: 'Sport'},
    {value: 'casual', viewValue: 'Casual'},
    {value: 'puzzle', viewValue: 'Puzzle'},
    {value: 'box', viewValue: 'Box'},
  ];
  cities = [
    {value: 'lviv', viewValue: 'Lviv'},
    {value: 'odesa', viewValue: 'Odesa'},
    {value: 'kyiv', viewValue: 'Kyiv'}
  ];
  districts = [
    {value: 'Frankivskiy', viewValue: 'Frankivskiy'},
    {value: 'Galitskiy', viewValue: 'Galitskiy'},
    {value: 'Shevchenkivskiy', viewValue: 'Shevchenkivskiy'},
  ];
  event_categories = [
    {value: 'casual', viewValue: 'Casual'},
    {value: 'tournament', viewValue: 'Tournament'},
  ];
  // right column
  event_modes = [
    {value: 'single', viewValue: 'Single'},
    {value: 'team', viewValue: 'Team'},
  ];

  constructor(private eventService: EventService) {
  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      let q = $event.target.value;
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    this.lastKeypress = $event.timeStamp
  }

  ngOnInit() {
    this.events = [];
    this.eventService
      .searchEvent(this.startAt, this.endAt)
      .subscribe(events => {
        this.events = events;
      });
  }
}
