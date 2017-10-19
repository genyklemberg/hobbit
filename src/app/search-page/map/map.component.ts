import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Event} from '../../interfaces/event';
import {Map} from '../../common/map-options'
@Component({
  selector: 'hb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [EventService, AngularFireDatabase, Map]
})
export class MapComponent implements OnInit {
  events: Array<Event>;
  event: Event;
  constructor(private eventService: EventService,
              public map: Map) {
  }
  ngOnInit() {
    this.events = [];
    this.eventService
      .getAllEvent()
      .subscribe(events => {
        this.events = events;
      });
  }
}
