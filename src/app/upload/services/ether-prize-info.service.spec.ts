import { TestBed } from '@angular/core/testing';

import { EtherPrizeInfoService } from './ether-prize-info.service';

describe('EtherPrizeInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtherPrizeInfoService = TestBed.get(EtherPrizeInfoService);
    expect(service).toBeTruthy();
  });
});
