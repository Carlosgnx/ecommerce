import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

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
