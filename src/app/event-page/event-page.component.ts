import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Event } from '../interfaces/event';
import { EventService } from '../services/event/event.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { HostListener} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Constants }  from '../constants'

@Component({
  selector: 'hb-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
  providers: [EventService, AngularFireDatabase, Constants]
})
export class EventPageComponent implements OnInit {
  event: Event;
  isEditEventMode: Boolean = false;
  editEventForm: FormGroup;
  name:string;
  description: string;
  location: string;
  comment: string;
  date: Date;
  startDate: Date;
  endDate: Date;
  minDate = new Date();
  constructor(private eventService: EventService, private route: ActivatedRoute,  private router: Router,
    private fb: FormBuilder, public ERRORS: Constants){
    this.editEventForm =fb.group( 
      {
        'name': [this.name, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        'description': [this.description, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])],
        'startDate': [this.startDate, Validators.required],
        'endDate': [this.endDate, Validators.required],
        'location': [this.location, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(500)])],
        'comment': [this.comment, Validators.compose([Validators.maxLength(500)])]        
      }
    );
  }

  updateEvent(post){
    let updatedEvent = {
      name: post.name,
      description: post.description,
      startDate: post.startDate,
      endDate: post.endDate,
      location: post.location,
      comment: post.comment
    };
    this.eventService.updateEvent(this.event.$key, updatedEvent);
    this.isEditEventMode = !this.isEditEventMode;
  }

  ngOnInit() {  
    let keyFromRoute;
    this.route.params.subscribe(params => 
      keyFromRoute = params['key'],
      (err) => console.log(err))
    this.eventService.getEvent(keyFromRoute).subscribe(res => 
    this.event = res,
    (err) => console.log(err))
  }

  deleteEvent(event: Event){
    this.eventService.deleteEvent(event.$key);
    this.router.navigate(['']);
  }

  editEvent(event:Event){ 
    if(event.startDate!=null && !(event.startDate instanceof Date)){
      event.startDate = new Date(event.startDate)
    }
    if(event.endDate!=null && !(event.endDate instanceof Date)){
      event.endDate = new Date(event.endDate)
    }
    this.isEditEventMode = !this.isEditEventMode;
  }
}

