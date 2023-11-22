import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../service/servicio.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage  {

  
  nombre: string="";
  cedula: string="";
  celular: string="";
  correo: string="";
  password: string="";



  constructor(private authService: ServicioService,private router: Router, private alertController: AlertController) {}

  async register() {
    try {
      await this.authService.signUp(this.nombre, this.cedula + "@dominio.com", this.celular, this.correo, this.password);
  
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Usuario registrado con éxito.',
        buttons: ['OK']
      });
  
      await alert.present();
  
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error de registro:', error);
    }
  }
}