import { TestBed } from '@angular/core/testing';

import { MboacultureService } from './mboaculture.service';

describe('MboacultureService', () => {
  let service: MboacultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MboacultureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
