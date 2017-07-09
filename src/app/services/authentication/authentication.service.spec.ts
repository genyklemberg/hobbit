import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';


class FakeAuthenticationService { }

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthenticationService, useClass:FakeAuthenticationService }]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
