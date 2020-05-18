import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { KebabCasePipe } from '../kebab-case.pipe';
import { take, filter, switchMap, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FingerRule } from '../meeting/rule-list/finger-rule/finger-rule.component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private meetingID: string;

  constructor(
    private db: AngularFireDatabase,
    private kebabCase: KebabCasePipe,
    private auth: AuthService
  ) { }

  public createMeeting(meetingID: string, meetingName: string): Promise<void> {
    return this.db.object(`meetings/${meetingID}`).set({
      name: meetingName
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
    return this.auth.getUid$().pipe(
      filter(uid => !!uid),
      switchMap(uid => this.db.object<boolean>(`meetings/${this.meetingID}/users/${uid}/isAdmin`).valueChanges())
    ).pipe(take(1));
  }

  public joinMeeting(meetingID: string, isAdmin: boolean): Promise<void> {
    this.setMeetingID(meetingID);
    const username = this.auth.getUsername();
    const uid = this.auth.getUid();

    return this.db.object(`meetings/${meetingID}/users/${uid}`).set({
      username,
      isAdmin
    });
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

}
