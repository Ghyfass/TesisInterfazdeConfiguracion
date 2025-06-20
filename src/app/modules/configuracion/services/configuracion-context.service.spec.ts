import { TestBed } from '@angular/core/testing';

import { ConfiguracionContextService } from './configuracion-context.service';

describe('ConfiguracionContextService', () => {
  let service: ConfiguracionContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
