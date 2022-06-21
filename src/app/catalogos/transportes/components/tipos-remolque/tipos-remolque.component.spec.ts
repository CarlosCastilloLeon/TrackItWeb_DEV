import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposRemolqueComponent } from './tipos-remolque.component';

describe('TiposRemolqueComponent', () => {
  let component: TiposRemolqueComponent;
  let fixture: ComponentFixture<TiposRemolqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposRemolqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposRemolqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
