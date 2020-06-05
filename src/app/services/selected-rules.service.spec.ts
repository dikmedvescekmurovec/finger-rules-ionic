import { TestBed } from '@angular/core/testing';

import { SelectedRulesService } from './selected-rules.service';

describe('SelectedRulesService', () => {
  let service: SelectedRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
