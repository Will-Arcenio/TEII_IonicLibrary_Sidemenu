import { TestBed } from '@angular/core/testing';

import { PublishersApiService } from './publishers-api.service';

describe('PublishersApiService', () => {
  let service: PublishersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
