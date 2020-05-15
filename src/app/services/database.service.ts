import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { KebabCasePipe } from '../kebab-case.pipe';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase, private kebabCase: KebabCasePipe) { }

  public createMeeting(meetingID: string, meetingName: string): Promise<void> {
    return this.db.object(`meetings/${meetingID}`).set({
      name: meetingName
    });
  }

  public generateMeetingID(meetingName: string): string {
    const meetingHandle = this.kebabCase.transform(meetingName);
    return `${meetingHandle}-${Math.random().toString(36).substring(7)}`;
  }

  public joinMeeting(meetingID: string, name: string, uid: string, isAdmin: boolean): Promise<void> {
    return this.db.object(`meetings/${meetingID}/users/${uid}`).set({
      name,
      isAdmin
    });
  }

}
