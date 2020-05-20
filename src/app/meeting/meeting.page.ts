import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedRulesService } from '../selected-rules.service';
import { DatabaseService } from '../services/database.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  public meetingID: string;
  public meetingName: string;
  public exists: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DatabaseService,
    public selectedRulesService: SelectedRulesService,
    private router: Router,
    private clipboard: Clipboard,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.meetingID = this.activatedRoute.snapshot.paramMap.get('meetingID');
    this.db.setMeetingID(this.meetingID);
    this.db.doesMeetingExist(this.meetingID).subscribe(exists => {
      if (exists) {
        this.db.joinMeeting();
        this.db.getMeetingName(this.meetingID).subscribe(meetingName => this.meetingName = meetingName);
        this.exists = true;
      }
    })
  }

  public back() {
    this.router.navigateByUrl('start');
  }

  async copyShareInfo() {
    this.clipboard.copy(`To join my Finger Rules meeting, click this link ${window.location.href}`);
    const toast = await this.toastController.create({
      message: 'Joining info has been copied to the clipboard.',
      duration: 5000
    });
    toast.present();
  }

}
