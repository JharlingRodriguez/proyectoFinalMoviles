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
  carril: any;


  constructor(private firebaseService:ServicioService, private alertController: AlertController) { }

  async registrarAlumno() {
    if (this.firebaseService.usuarioActual) {
      const usuarioUid = this.firebaseService.usuarioActual.uid;
      let alumnoId = '';

      await this.firebaseService.registrarAlumno(this.nombre, this.seccion, usuarioUid, this.carril)
        .then((data) => {
          alumnoId = data.alumnoId;
          this.presentAlert('Éxito', 'Alumno registrado con éxito.');
        })
        .catch((error) => {
          console.error('Error al registrar alumno:', error);
          this.presentAlert('Error', 'Hubo un error al registrar al alumno.');
        });

        this.obtenerAlumnos()
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  

ngOnInit() {
  this.obtenerAlumnos();
}


obtenerAlumnos() {
  if (this.firebaseService.usuarioActual) {
    const usuarioUid = this.firebaseService.usuarioActual.uid;

    this.firebaseService.obtenerAlumnosPorUsuario(usuarioUid).subscribe(data => {
      this.alumnos = data;
      console.log(data)
    });
  }
}


eliminarAlumno(id: string) {
  this.firebaseService.eliminarAlumno(id)
    .then(() => {
      console.log('Alumno eliminado con éxito');
      this.obtenerAlumnos();
    })
    .catch((error) => {
      console.error('Error al eliminar alumno:', error);
    });
}

}