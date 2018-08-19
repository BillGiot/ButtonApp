import { TestBed, inject } from '@angular/core/testing';

import { ButtonDataService } from './button-data.service';

describe('ButtonDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ButtonDataService]
    });
  });

  it('should be created', inject([ButtonDataService], (service: ButtonDataService) => {
    expect(service).toBeTruthy();
  }));
});
