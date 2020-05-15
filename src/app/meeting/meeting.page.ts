import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  public meetingID: string;
  public meetingName: string = 'Test name'; // TODO: Remove test string

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.meetingID = this.activatedRoute.snapshot.paramMap.get('meetingID');
  }

}
