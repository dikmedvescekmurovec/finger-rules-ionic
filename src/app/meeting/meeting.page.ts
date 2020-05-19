import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { SelectedRulesService } from '../selected-rules.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  public meetingID: string;
  public meetingName = '...';

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DatabaseService,
    public selectedRulesService: SelectedRulesService,
    private router: Router,
    private clipboard: Clipboard) { }

  ngOnInit() {
    this.meetingID = this.activatedRoute.snapshot.paramMap.get('meetingID');
    this.db.setMeetingID(this.meetingID);
    this.db.joinMeeting();
    this.db.getMeetingName(this.meetingID).subscribe(meetingName => this.meetingName = meetingName);
  }

  back() {
    this.router.navigateByUrl('start');
  }

  copyShareInfo() {
    console.log(`To join my Finger Rules meeting click here ${this.router.url} or enter ${this.meetingID} into your app.`);
    this.clipboard.copy(`To join my Finger Rules meeting click here ${this.router.url} or enter ${this.meetingID} into your app.`);
  }

}
