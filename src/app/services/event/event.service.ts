import { Injectable } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EVENTS } from './mock-events'

@Injectable()
export class EventService {

  constructor() { }

  getEvents(): Event[] {
    return EVENTS;
  }

}
