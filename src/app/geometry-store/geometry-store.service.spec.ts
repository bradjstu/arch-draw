import { TestBed } from '@angular/core/testing';

import { GeometryStoreService } from './geometry-store.service';

describe('GeometryStoreService', () => {
  let service: GeometryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeometryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
