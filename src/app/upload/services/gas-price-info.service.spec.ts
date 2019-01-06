import { TestBed } from '@angular/core/testing';

import { GasPriceInfoService } from './gas-price-info.service';

describe('GasPriceInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GasPriceInfoService = TestBed.get(GasPriceInfoService);
    expect(service).toBeTruthy();
  });
});
