import { TestBed } from '@angular/core/testing';

import { EventsqueryService } from './eventsquery.service';

describe('EventsqueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsqueryService = TestBed.get(EventsqueryService);
    expect(service).toBeTruthy();
  });
});
