import { Component,OnInit } from '@angular/core';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.page.html',
  styleUrls: ['./registrar-alumno.page.scss'],
})
export class RegistrarAlumnoPage  {
  nombre: string="";
  seccion: string="";
  alumnos: any=[];


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

OnInit() {
  this.obtenerAlumnos();
}

obtenerAlumnos() {
  this.firebaseService.obtenerAlumnos().subscribe((data) => {
    this.alumnos = data.map((e) => {
      return {
        id: e.payload.doc.id,
        ...(e.payload.doc.data() as {}),
      };
    });
  });
}

eliminarAlumno(id: string) {
  this.firebaseService.eliminarAlumno(id)
    .then(() => {
      console.log('Alumno eliminado con éxito');
      this.obtenerAlumnos(); // Vuelve a obtener la lista de alumnos después de eliminar uno
    })
    .catch((error) => {
      console.error('Error al eliminar alumno:', error);
    });
}

}
