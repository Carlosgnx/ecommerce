import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.auth.authState.subscribe((res) => {
      console.log('Trigger: ' + res);
      this.loggedUser = res;
    });
  }

  loggedUser: any = null;

  async login(email: string, password: string): Promise<any> {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string): Promise<any> {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.auth.signOut();
  }
  async setPersistence(persistence: string) {
    await this.auth.setPersistence(persistence);
  }
}
