import { Component,OnInit } from '@angular/core';
import { ServicioService } from '../service/servicio.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.page.html',
  styleUrls: ['./registrar-alumno.page.scss'],
})
export class RegistrarAlumnoPage implements OnInit {
  nombre: string="";
  seccion: string="";
  alumnos: any;


  constructor(private firebaseService:ServicioService, private alertController: AlertController) { }

  registrarAlumno() {
    if (this.firebaseService.usuarioActual) {
      const usuarioUid = this.firebaseService.usuarioActual.uid;

      this.firebaseService.registrarAlumno(this.nombre, this.seccion, usuarioUid)
        .then(() => {
          console.log('Alumno registrado con éxito');
        })
        .catch((error) => {
          console.error('Error al registrar alumno:', error);
        });
    }
  }
  

ngOnInit() {
  this.obtenerAlumnos();
}


obtenerAlumnos() {
  if (this.firebaseService.usuarioActual) {
    const usuarioUid = this.firebaseService.usuarioActual.uid;

    this.firebaseService.obtenerAlumnosPorUsuario(usuarioUid).subscribe((data) => {
      this.alumnos = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        };
      });
    });
  }
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
