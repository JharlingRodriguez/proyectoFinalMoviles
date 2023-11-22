import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async signUp(nombre: string, cedula: string, celular: string, correo: string, password: string): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(cedula, password);
    
 if (userCredential.user) {
    const user = userCredential.user;

    // Almacena información adicional del usuario en Firestore
    await this.firestore.collection('usuarios').doc(user.uid).set({
      nombre,
      cedula,
      celular,
      correo
    });
  } else {
    // Manejar el caso donde user es null, si es necesario
    console.error('El objeto user es nulo.');
  }
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

}
