import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Event} from '../../interfaces/event';

@Component({
  selector: 'hb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [EventService, AngularFireDatabase]
})
export class MapComponent implements OnInit {
  events: Array<Event>;
  event: Event;
  public customStyle = [
    // @formatter:off
    {"featureType": "administrative", "elementType": "all", "stylers": [{"saturation": "-100"}]}, {"featureType": "administrative.province", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "landscape", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "simplified"}]}, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": "-100"}]}, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]}, {"featureType": "road.arterial", "elementType": "all", "stylers": [{"lightness": "30"}]}, {"featureType": "road.local", "elementType": "all", "stylers": [{"lightness": "40"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"lightness": -25}, {"saturation": -100}]}
    // @formatter:on
  ];
  constructor(private eventService: EventService) {
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
