import { TestBed, inject } from '@angular/core/testing';
import { EventService } from './event.service';
import { Observable } from 'rxjs/Rx';
import { EVENTS } from './mock-events';

class FakeEventService {
  getEvents(){
    return Observable.interval(500).map(i => EVENTS);
  }
 }

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EventService, useClass:FakeEventService }]
    });
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});
