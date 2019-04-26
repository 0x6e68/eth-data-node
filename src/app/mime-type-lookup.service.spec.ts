import { TestBed } from '@angular/core/testing';

import { MimeTypeLookupService } from './mime-type-lookup.service';

describe('MimeTypeLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MimeTypeLookupService = TestBed.get(MimeTypeLookupService);
    expect(service).toBeTruthy();
  });
});
