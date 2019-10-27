import { TestBed } from '@angular/core/testing';

import { EventsparserService } from './eventsparser.service';

describe('EventsparserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsparserService = TestBed.get(EventsparserService);
    expect(service).toBeTruthy();
  });
});
