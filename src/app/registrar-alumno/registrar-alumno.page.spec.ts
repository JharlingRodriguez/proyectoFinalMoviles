import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarAlumnoPage } from './registrar-alumno.page';

describe('RegistrarAlumnoPage', () => {
  let component: RegistrarAlumnoPage;
  let fixture: ComponentFixture<RegistrarAlumnoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrarAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
