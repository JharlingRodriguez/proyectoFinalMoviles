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

  constructor(private firebaseService: ServicioService, private alertController: AlertController) { }

  ngOnInit() {
    // Verifica si usuarioActual está definido en el servicio
    if (this.firebaseService.usuarioActual) {
      this.usuarioUid = this.firebaseService.usuarioActual.uid;
    } else {
      // Puedes manejar el caso donde usuarioActual no está definido, por ejemplo, redirigir a la página de inicio de sesión.
      console.error('El objeto usuarioActual no está definido.');
    }
  }

  async registrarRecogida() {
    const usuario = this.firebaseService.usuarioActual.uid;

    try {
      await this.firebaseService.registrarRecogida(this.carril, usuario);
      console.log('Recogida registrada con éxito');
      await this.presentSuccessAlert('Recogida registrada con éxito');
    } catch (error) {
      console.error('Error al registrar recogida:', error);
      await this.presentErrorAlert('Error al registrar la recogida');
    }
  }

  async eliminarRecogida(id: string) {
    try {
      // Elimina la recogida de la base de datos
      await this.firebaseService.eliminarRecogida(id);
      console.log('Recogida eliminada con éxito');
      
      // Muestra una alerta de éxito
      await this.presentSuccessAlert('Recogida eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar recogida:', error);
      
      // Muestra una alerta de error
      await this.presentErrorAlert('Error al eliminar la recogida');
    }
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

