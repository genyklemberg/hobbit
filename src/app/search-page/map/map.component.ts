import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'hb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  coordinates = [
    {latitude: 49.853338, longitude: 24.024192},
    {latitude: 49.841919, longitude: 24.031618},
    {latitude: 49.774775, longitude: 24.027699},
  ];
  public customStyle = [
    // @formatter:off
    {"featureType": "administrative", "elementType": "all", "stylers": [{"saturation": "-100"}]}, {"featureType": "administrative.province", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "landscape", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "simplified"}]}, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": "-100"}]}, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]}, {"featureType": "road.arterial", "elementType": "all", "stylers": [{"lightness": "30"}]}, {"featureType": "road.local", "elementType": "all", "stylers": [{"lightness": "40"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"lightness": -25}, {"saturation": -100}]}
    // @formatter:on
  ];
  constructor() {
  }
  ngOnInit() {
  }
}
