import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-recoger',
  templateUrl: './recoger.page.html',
  styleUrls: ['./recoger.page.scss'],
})
export class RecogerPage  {
  carril: string="";
usuarioUid: any= this.firebaseService.usuarioActual.uid;;
  

  constructor(private firebaseService:ServicioService) { }

 // ngOnInit() {
  //}

  registrarRecogida() {
    const usuario = this.firebaseService.usuarioActual.uid;
    this.firebaseService.registrarRecogida(this.carril, usuario)
      .then(() => {
        console.log('Recogida registrada con éxito');
      })
      .catch((error) => {
        console.error('Error al registrar recogida:', error);
      });
  }

  eliminarRecogida(id: string) {
    this.firebaseService.eliminarRecogida(id)
      .then(() => {
        console.log('Recogida eliminada con éxito');
      })
      .catch((error) => {
        console.error('Error al eliminar recogida:', error);
      });
  }
}
