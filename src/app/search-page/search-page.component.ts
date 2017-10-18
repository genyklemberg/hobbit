import {Component, OnInit} from '@angular/core';
import {EventService} from '../services/event/event.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Event} from '../interfaces/event';
import {Subject} from 'rxjs/Subject';
import {EventForm} from '../common/event-form.model';
import {FormFields} from '../constants/form-fields.constants';

@Component({
  selector: 'hb-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  providers: [EventService, AngularFireDatabase, EventForm, FormFields]
})
export class SearchPageComponent implements OnInit {
  events: Array<Event>;
  startAt = new Subject();
  endAt = new Subject();
  event: Event;
  lastKeypress: number = 0;
  constructor(private eventService: EventService, public eventForm: EventForm,  public fields: FormFields) {
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
