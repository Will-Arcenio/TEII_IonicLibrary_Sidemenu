import { TestBed } from '@angular/core/testing';

import { AuthorsApiService } from './authors-api.service';

describe('AuthorsApiService', () => {
  let service: AuthorsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
