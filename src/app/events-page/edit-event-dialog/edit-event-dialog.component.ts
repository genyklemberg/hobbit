import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Event } from '../../interfaces/event';
import { EventService } from '../../services/event/event.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Constants }  from '../../constants'
@Component({
  selector: 'edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss'],
  providers: [EventService, AngularFireDatabase, Constants]
})
export class EditEventDialogComponent {
  event: Event; 
  updateEventForm: FormGroup;
  name:string;
  startDate: Date;
  endDate: Date;
  description: string;
  location: string;
  comment: string;
  minDate = new Date();
  constructor(private eventService: EventService, private dialogRef: MdDialogRef <EditEventDialogComponent>, private fb: FormBuilder, public ERRORS: Constants){
    this.updateEventForm =fb.group( 
      {
        'name': [this.name, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        'startDate': [this.startDate, Validators.required],
        'endDate': [this.endDate, Validators.required],
        'description': [this.description, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])],
        'location': [this.location, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(500)])],
        'comment': [this.comment, Validators.compose([Validators.maxLength(500)])]
      } 
    );
  }
  update(post){
    let updatedEvent = {
      name: post.name,
      description: post.description,
      startDate: post.startDate,
      endDate: post.endDate,
      location: post.location,
      comment: post.comment
    };
    this.eventService.updateEvent(this.event.$key, updatedEvent);
    this.dialogRef.close();
  }
}
