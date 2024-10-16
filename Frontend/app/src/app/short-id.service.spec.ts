import { TestBed } from '@angular/core/testing';

import { ShortIdService } from './short-id.service';

describe('ShortIdService', () => {
  let service: ShortIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
