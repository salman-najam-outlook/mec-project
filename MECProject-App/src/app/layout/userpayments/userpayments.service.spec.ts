import { TestBed, inject } from '@angular/core/testing';

import { UserpaymentsService } from './userpayments.service';

describe('UserpaymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserpaymentsService]
    });
  });

  it('should be created', inject([UserpaymentsService], (service: UserpaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
