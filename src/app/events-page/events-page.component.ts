import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hb-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pageTitle =  'Events';
}
