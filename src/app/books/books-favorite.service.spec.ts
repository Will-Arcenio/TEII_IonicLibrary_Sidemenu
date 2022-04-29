import { TestBed } from '@angular/core/testing';

import { BooksFavoriteService } from './books-favorite.service';

describe('BooksFavoriteService', () => {
  let service: BooksFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
