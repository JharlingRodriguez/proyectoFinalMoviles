import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cedula: string="";
  password: string="";

  constructor(private afAuth: AngularFireAuth,private router: Router) {}

  login() {
    const email = this.cedula + '@dominio.com';

    this.afAuth.signInWithEmailAndPassword(email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Inicio de sesión exitoso:', user);
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de inicio de sesión:', errorMessage);
      });
  }

}
