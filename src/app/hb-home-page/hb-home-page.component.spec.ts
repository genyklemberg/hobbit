import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HbHomePageComponent } from './hb-home-page.component';

describe('HbHomePageComponent', () => {
  let component: HbHomePageComponent;
  let fixture: ComponentFixture<HbHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HbHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HbHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
