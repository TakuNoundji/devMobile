import { TestBed } from '@angular/core/testing';

import { BdSqliteService } from './bd-sqlite.service';

describe('BdSqliteService', () => {
  let service: BdSqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdSqliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
