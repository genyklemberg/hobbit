import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEventVidgetComponent } from './daily-event-vidget.component';

describe('DailyEventVidgetComponent', () => {
  let component: DailyEventVidgetComponent;
  let fixture: ComponentFixture<DailyEventVidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyEventVidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyEventVidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
