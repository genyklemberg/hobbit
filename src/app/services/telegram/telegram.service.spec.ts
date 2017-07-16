import { TestBed, inject } from '@angular/core/testing';

import { TelegramService } from './telegram.service';

class FakeTelegramService { }

describe('TelegramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TelegramService, useClass:FakeTelegramService }]
    });
  });

  it('should be created', inject([TelegramService], (service: TelegramService) => {
    expect(service).toBeTruthy();
  }));
});
