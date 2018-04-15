import { TestBed, inject } from '@angular/core/testing';

import { SrvTop100Service } from './srv-top100.service';

describe('SrvTop100Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrvTop100Service]
    });
  });

  it('should be created', inject([SrvTop100Service], (service: SrvTop100Service) => {
    expect(service).toBeTruthy();
  }));
});
