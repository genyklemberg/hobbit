import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Event } from '../../interfaces/event';


@Injectable()
export class EventService {
  events: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.events = this.db.list('/events');
  }

  getEvents(itemNumber?: number, startAt?: Object ): FirebaseListObservable<any>{
    let tempQuery = {};
    if (startAt) { tempQuery['startAt'] = startAt}
    if (itemNumber) { tempQuery['limitToFirst'] = itemNumber}
    if (startAt || itemNumber) {
      this.events = this.db.list('/events', {
        query: {
          startAt: startAt,
          limitToFirst: itemNumber
        }
      });
    } else {
      this.events = this.db.list('/events');
    }
    return this.events;
  }

  addEvent(event:Event) {
    this.events.push(this.convertEvent(event));
  }

  updateEvent(key: string, event:Event) {
    this.events.update(key, this.convertEvent(event));
  }

  deleteEvent(key: string) {
    this.events.remove(key);
  }

  deleteAll() {
    this.events.remove();
  }

  // convert date to string, Firebase cannot save Date object!
  private convertEvent(event:Event): Object {
    let obj = {};
    for (let prop in event) {
      if (prop === 'date'){
        obj[prop] = event[prop].toUTCString();
      } else {
        obj[prop] = event[prop];
      }
    }
    return obj;
  }

}