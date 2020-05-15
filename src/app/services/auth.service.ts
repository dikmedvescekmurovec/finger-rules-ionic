import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uid: string;

  constructor(private auth: AngularFireAuth) {
  }

  public loginAnonymously() {
    this.auth.setPersistence('local');
    this.auth.signInAnonymously().then(credential => this.uid = credential.user.uid);
  }

  public getUid(): string {
    return this.uid;
  }
}
