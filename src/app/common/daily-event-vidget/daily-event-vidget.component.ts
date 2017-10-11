import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { AngularFireDatabase} from 'angularfire2/database';
import { Event } from '../../interfaces/event';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'hb-daily-event-vidget',
  templateUrl: './daily-event-vidget.component.html',
  styleUrls: ['./daily-event-vidget.component.scss'],
  providers: [EventService, AngularFireDatabase]
})

export class DailyEventVidgetComponent implements OnInit {
  curDate: Object = new Date();
  recentEvents: Array<Event>;
  curGames: Array<Event> =[];
  curTournaments: Array<Event> =[];

  constructor ( private eventService: EventService ) {}

  transform(array, args): Array<Event> {
    array.sort((a: any, b: any) => {
      if(a.date < b.date) {
        return -1;
      } else if(a.date > b.date){
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

  getCurrentEvents(events){
    events.forEach(element => {
      if(moment(element.date).unix() >=  moment(this.curDate).unix()) {
        if(element.event_category == 'tournament'){
          this.curTournaments.push(element);
        } else {
          this.curGames.push(element);
        }
      }
    });
    return this.curGames;
  }

  ngOnInit() {
    this.recentEvents = [];
    this.eventService.getRecentEvents().subscribe((events) => {
      this.recentEvents = events;
      this.getCurrentEvents(this.recentEvents);
      this.recentEvents = [];
      console.log(this.curGames);      
    }); 
    console.log(this.curDate);
  }
}
