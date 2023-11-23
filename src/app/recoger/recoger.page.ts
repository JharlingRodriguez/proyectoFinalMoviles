import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../service/servicio.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recoger',
  templateUrl: './recoger.page.html',
  styleUrls: ['./recoger.page.scss'],
})
export class RecogerPage {
  carril: string = "";
  usuarioUid: any;
  alumnos: any;

  constructor(private firebaseService: ServicioService, private alertController: AlertController) { }

  ngOnInit() {
    // Verifica si usuarioActual está definido en el servicio
    if (this.firebaseService.usuarioActual) {
      this.usuarioUid = this.firebaseService.usuarioActual.uid;
    } else {
      // Puedes manejar el caso donde usuarioActual no está definido, por ejemplo, redirigir a la página de inicio de sesión.
      console.error('El objeto usuarioActual no está definido.');
    }

    this.obtenerAlumnos()
  }

  obtenerAlumnos() {
    if (this.firebaseService.usuarioActual) {
      const usuarioUid = this.firebaseService.usuarioActual.uid;
  
      this.firebaseService.obtenerAlumnosPorUsuario(usuarioUid).subscribe(data => {
        this.alumnos = data;
      });
    }
  }

  montarAlumno(alumnoId: any) {
    this.firebaseService.montarAlumno(alumnoId).then(() => {
      console.log('Alumno montado en carril:', alumnoId);
      // Actualiza la lista de alumnos si es necesario
    }).catch(error => {
      console.error('Error al montar al alumno:', error);
    });
  }

  // Función para marcar al alumno como no recogido
  eliminarAlumno(alumnoId: string) {
    this.firebaseService.eliminarMontadaAlumno(alumnoId).then(() => {
      console.log('Alumno eliminado del carril:', alumnoId);
      // Actualiza la lista de alumnos si es necesario
    }).catch(error => {
      console.error('Error al eliminar al alumno:', error);
    });
  }

  async presentSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

