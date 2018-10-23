import { TestBed, inject } from '@angular/core/testing';

import { RegisterationRequestsService } from './registeration-requests.service';

describe('RegisterationRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterationRequestsService]
    });
  });

  it('should be created', inject([RegisterationRequestsService], (service: RegisterationRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
