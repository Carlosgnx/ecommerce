import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {
    if (this.getUserSession()) {
      console.log('hay usuario');
      this.user = this.getUserSession();
      console.log(this.user);
    } else {
      console.log('NO hay usuario');
    }
  }

  //Referencia a la base de datos.
  usersDB: AngularFirestoreCollection = this.afs.collection('users');

  //Cuando es verdadero activa la pantalla de carga
  loading: boolean = false;

  //Representa el usuario que esta activo en la sesion.
  user: any = null;

  createUser(uid: string, user: User) {
    return this.usersDB.doc(uid).set(user);
  }

  getUserData(uid: string): Observable<any> {
    return this.usersDB.doc(uid).get();
  }

  setUserSession(user: any): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserSession(): Object {
    return JSON.parse(localStorage.getItem('user')!);
  }

  removeUserSession(): void {
    localStorage.removeItem('user');
    this.user = null;
  }
}
