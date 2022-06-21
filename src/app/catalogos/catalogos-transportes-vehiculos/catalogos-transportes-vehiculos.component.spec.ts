import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogosTransportesVehiculosComponent } from './catalogos-transportes-vehiculos.component';

describe('CatalogosTransportesVehiculosComponent', () => {
  let component: CatalogosTransportesVehiculosComponent;
  let fixture: ComponentFixture<CatalogosTransportesVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogosTransportesVehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogosTransportesVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
