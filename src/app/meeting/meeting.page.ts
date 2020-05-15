import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  public meetingID: string;
  public meetingName = '...';

  constructor(private activatedRoute: ActivatedRoute, private db: DatabaseService) { }

  ngOnInit() {
    this.meetingID = this.activatedRoute.snapshot.paramMap.get('meetingID');
    this.db.setMeetingID(this.meetingID);
    this.db.getMeetingName(this.meetingID).subscribe(meetingName => this.meetingName = meetingName);
  }

}
