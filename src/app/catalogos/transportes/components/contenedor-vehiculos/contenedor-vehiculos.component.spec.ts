import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorVehiculosComponent } from './contenedor-vehiculos.component';

describe('ContenedorVehiculosComponent', () => {
  let component: ContenedorVehiculosComponent;
  let fixture: ComponentFixture<ContenedorVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorVehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
