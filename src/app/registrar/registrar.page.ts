import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../service/servicio.service';

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



  constructor(private authService: ServicioService,private router: Router) {}

  register() {
  
    this.authService.signUp(this.nombre, this.cedula+"@dominio.com", this.celular, this.correo, this.password, )
      .then(() => {
        console.log('Registro exitoso');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error de registro:', error.message);
      });
  }
 
}
