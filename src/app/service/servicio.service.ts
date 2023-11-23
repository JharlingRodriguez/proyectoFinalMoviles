import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

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
  async signUp(nombre: string, cedula: string, celular: string, correo: string, password: string, carril: string): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(cedula, password);
    
    if (userCredential.user) {
      const user = userCredential.user;

      // Almacena información adicional del usuario en Firestore
      await this.firestore.collection('usuarios').doc(user.uid).set({
        nombre,
        cedula,
        celular,
        correo,
        carril
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
  registrarAlumno(nombre: string, seccion: string, usuarioUid: string, carril: string) {
    return this.firestore.collection('alumnos').add({ nombre, seccion, usuarioUid, carril, recogido: false })
      .then(docRef => {
        const alumnoId = docRef.id;

      // Recuperar los datos del documento junto con el ID
      return docRef.get().then(doc => {
        if (doc.exists) {
          // Si el documento existe, devolver los datos y el ID
          const alumnoData: any = doc.data();
          return { alumnoId, ...alumnoData };
          } else {
            console.error('No se encontró el documento!');
            return null;
          }
        });
      })
      .catch(error => {
        console.error('Error al registrar al alumno:', error);
        throw error;
      });
  }
  
  // Método para obtener alumnos por usuario
  obtenerAlumnosPorUsuario(usuarioUid: string) {
    return this.firestore.collection('alumnos', ref => ref.where('usuarioUid', '==', usuarioUid))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const id = a.payload.doc.id;
          const data: any = a.payload.doc.data();
          return { id, ...data };
        }))
      );
  }
  
  // Método para eliminar un alumno
  eliminarAlumno(id: string) {
    return this.firestore.collection('alumnos').doc(id).delete();
  }

  montarAlumno(alumnoId: string) {
    return this.firestore.collection('alumnos').doc(alumnoId).update({ recogido: true });
  }

  // Actualiza el estado de recogido de un alumno a false
  eliminarMontadaAlumno(alumnoId: string) {
    return this.firestore.collection('alumnos').doc(alumnoId).update({ recogido: false });
  }
}

