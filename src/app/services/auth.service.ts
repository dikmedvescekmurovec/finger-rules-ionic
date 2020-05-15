import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uid$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private username: string;

  constructor(private auth: AngularFireAuth) {
  }

  public loginAnonymously() {
    this.auth.setPersistence('local');
    this.auth.signInAnonymously().then(credential => this.uid$.next(credential.user.uid));
  }

  public getUid(): string {
    return this.uid$.getValue();
  }

  public getUid$(): Observable<string> {
    return this.uid$;
  }

  public setUsername(username: string) {
    this.username = username;
    localStorage.setItem('finger-rules-username', username);
  }

  public getUsername(): string {
    return this.username || localStorage.getItem('finger-rules-username');
  }

}
