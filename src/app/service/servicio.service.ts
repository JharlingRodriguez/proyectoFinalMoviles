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

    // Registrar alumno en Firebase
    registrarAlumno(nombre: string, seccion: string) {
      return this.firestore.collection('alumnos').add({ nombre, seccion });
    }
  
    // Obtener alumnos de Firebase
    obtenerAlumnos() {
      return this.firestore.collection('alumnos').snapshotChanges();
    }
  
    // Eliminar alumno de Firebase
    eliminarAlumno(id: string) {
      return this.firestore.collection('alumnos').doc(id).delete();
    }
  
    // Registrar recogida en Firebase
    registrarRecogida(carril: string, alumnoId: string) {
      return this.firestore.collection('recogidas').add({ carril, alumnoId });
    }
  
    // Eliminar recogida de Firebase
    eliminarRecogida(id: string) {
      return this.firestore.collection('recogidas').doc(id).delete();
    }
  

}