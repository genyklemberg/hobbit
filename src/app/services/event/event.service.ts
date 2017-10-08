import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Event } from '../../interfaces/event';


@Injectable()
export class EventService {
  events: FirebaseListObservable<any>;
<<<<<<< HEAD
<<<<<<< HEAD
  curDate: Object = new Date();
=======
  dateProperties = ['date','startDate','endDate'];
>>>>>>> 767e1cea9d786e7a879afae71f2d9a409b8f4d30
=======
  curDate: Object = new Date();
>>>>>>> bf6a12dc54657ea2204296363aa0628969157308

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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bf6a12dc54657ea2204296363aa0628969157308
  getRecentEvents() {
     this.events = this.db.list('/events', {
        query: {
          orderByChild: '/name', 
          startAt: false 
        }
      })
      return this.events;
      
<<<<<<< HEAD
  }


=======
  getEvent(itemKey: string){
    return this.db.object('/events/'+ itemKey);
  }

>>>>>>> 767e1cea9d786e7a879afae71f2d9a409b8f4d30
=======
  }


>>>>>>> bf6a12dc54657ea2204296363aa0628969157308
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
      if (event[prop] != null){
        if (this.dateProperties.includes(prop)){
          obj[prop] = event[prop].toUTCString();
        } else {
          obj[prop] = event[prop];
        }
      }
    }
    return obj;
  }

  searchEvent(start, end): FirebaseListObservable<any> {
    return this.db.list('/events', {
      query: {
        searchByTitle: 'Title',
        orderByChild: 'name',
        limitToFirst: 20,
        startAt: start,
        endAt: end
      }
    });
  }

}
