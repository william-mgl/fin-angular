import { TestBed } from '@angular/core/testing';

import { MiServicioRutasService } from './mi-servicio-rutas.service';

describe('MiServicioRutasService', () => {
  let service: MiServicioRutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiServicioRutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
