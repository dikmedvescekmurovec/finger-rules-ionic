import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { KebabCasePipe } from '../kebab-case.pipe';
import { take, filter, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FingerRule } from '../models/finger-rule.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private meetingID: string;
  private isAdmin: boolean;

  constructor(
    private db: AngularFireDatabase,
    private kebabCase: KebabCasePipe,
    private auth: AuthService
  ) { }

  public createMeeting(meetingID: string, meetingName: string): Promise<void> {
    return this.db.object(`meetings/${meetingID}`).set({
      name: meetingName,
      admin: this.auth.getUid()
    });
  }

  public getMeetingName(meetingID: string): Observable<string> {
    return this.db.object<string>(`meetings/${meetingID}/name`).valueChanges().pipe(take(1));
  }

  public generateMeetingID(meetingName: string): string {
    const meetingHandle = this.kebabCase.transform(meetingName);
    return `${meetingHandle}-${Math.random().toString(36).substring(7)}`;
  }

  public setMeetingID(meetingID: string) {
    this.meetingID = meetingID;
  }

  public getIsAdmin(): Observable<boolean> {
    return this.db.object<string>(`meetings/${this.meetingID}/admin`).valueChanges().pipe(
      map(admin => admin === this.auth.getUid())
    );
  }

  public async joinMeeting(): Promise<void> {
    this.setMeetingID(this.meetingID);
    const username = this.auth.getUsername();

    const uid = await this.auth.getUid$().pipe(
      filter(u => !!u),
      take(1)
    ).toPromise();

    this.removeOnDisconnect(uid);

    return this.db.object(`meetings/${this.meetingID}/users/${uid}`).set({
      username,
      isAdmin: this.isAdmin ? true : null
    });
  }

  private removeOnDisconnect(uid: string) {
    this.db.database.ref(`meetings/${this.meetingID}/users/${uid}`).onDisconnect().remove();
  }

  public getFingerRules(): Observable<FingerRule[]> {
    return this.db.object<FingerRule>(`meetings/${this.meetingID}/rules`).valueChanges().pipe(
      map(rules => !!rules ? Object.values(rules) : [])
    );
  }

  public addRule(rule: FingerRule) {
    this.db.object<FingerRule>(`meetings/${this.meetingID}/rules/${rule.id}`).set(rule);
  }

  public removeRule(id: string) {
    this.db.object<FingerRule>(`meetings/${this.meetingID}/rules/${id}`).remove();
  }

  public getUsers(): Observable<User[]> {
    return this.db.list<User>(`meetings/${this.meetingID}/users`).valueChanges();
  }

}
