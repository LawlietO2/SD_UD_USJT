import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasEspecialidadesComponent } from './consultas-especialidades.component';

describe('ConsultasEspecialidadesComponent', () => {
  let component: ConsultasEspecialidadesComponent;
  let fixture: ComponentFixture<ConsultasEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasEspecialidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
