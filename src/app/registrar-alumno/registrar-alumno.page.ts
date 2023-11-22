import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.page.html',
  styleUrls: ['./registrar-alumno.page.scss'],
})
export class RegistrarAlumnoPage  {
  nombre: string="";
  seccion: string="";

  constructor(private firebaseService:ServicioService) { }

  registrarAlumno() {
    this.firebaseService.registrarAlumno(this.nombre, this.seccion)
      .then(() => {
        console.log('Alumno registrado con éxito');
      })
      .catch((error) => {
        console.error('Error al registrar alumno:', error);
      });
}

}
