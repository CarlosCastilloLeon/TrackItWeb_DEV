import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogosSistemaRolesAccesoComponent } from './catalogos-sistema-roles-acceso.component';

describe('CatalogosSistemaRolesAccesoComponent', () => {
  let component: CatalogosSistemaRolesAccesoComponent;
  let fixture: ComponentFixture<CatalogosSistemaRolesAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogosSistemaRolesAccesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogosSistemaRolesAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
