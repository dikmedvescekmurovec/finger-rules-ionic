import { TestBed } from '@angular/core/testing';

import { HasUsernameGuard } from './has-username.guard';

describe('HasUsernameGuard', () => {
  let service: HasUsernameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasUsernameGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
