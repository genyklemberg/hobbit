import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Event } from '../../interfaces/event';
import { EventService } from '../../services/event/event.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss'],
  providers: [EventService, AngularFireDatabase]
})
export class EditEventDialogComponent {
  event: Event;
  newEvent: Event;
  constructor(private eventService: EventService, private dialogRef: MdDialogRef <EditEventDialogComponent>){

  }
  // TODO: refactor parameters into one object
  update(name:string, description: string, date: Date){
    let updatedEvent = {
      name,
      description,
      date
    };

    this.eventService.updateEvent(this.event.$key, updatedEvent);
    this.dialogRef.close();
  }
}