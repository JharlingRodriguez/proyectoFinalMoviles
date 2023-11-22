import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  usuarioActual: any; // Usuario actualmente autenticado

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { 
    // Suscribirse al cambio de estado de autenticación
    this.afAuth.authState.subscribe((usuario) => {
      this.usuarioActual = usuario; // Almacena el usuario actual
    });
  }

  // Método para registrarse
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

  // Método para iniciar sesión
  async signIn(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para cerrar sesión
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Método para registrar un alumno
  registrarAlumno(nombre: string, seccion: string, usuarioUid: string) {
    return this.firestore.collection('alumnos').add({ nombre, seccion, usuarioUid });
  }
  
  // Método para obtener alumnos por usuario
  obtenerAlumnosPorUsuario(usuarioUid: string) {
    return this.firestore.collection('alumnos', ref => ref.where('usuarioUid', '==', usuarioUid)).snapshotChanges();
  }
  
  // Método para eliminar un alumno
  eliminarAlumno(id: string) {
    return this.firestore.collection('alumnos').doc(id).delete();
  }
  
  // Método para registrar una recogida
  registrarRecogida(carril: string, alumnoId: string) {
    return this.firestore.collection('recogidas').add({ carril, alumnoId });
  }
  
  // Método para eliminar una recogida
  eliminarRecogida(id: string) {
    return this.firestore.collection('recogidas').doc(id).delete();
  }
}

