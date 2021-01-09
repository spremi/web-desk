import { TestBed } from '@angular/core/testing';

import { RunStateService } from './run-state.service';

describe('RunStateService', () => {
  let service: RunStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
