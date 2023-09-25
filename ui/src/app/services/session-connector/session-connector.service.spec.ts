import { TestBed } from '@angular/core/testing';

import { SessionConnectorService } from './session-connector.service';

describe('SessionConnectorService', () => {
  let service: SessionConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
