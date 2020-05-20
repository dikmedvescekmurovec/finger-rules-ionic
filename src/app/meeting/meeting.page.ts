import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedRulesService } from '../selected-rules.service';
import { DatabaseService } from '../services/database.service';
import { MenuComponent } from './menu/menu.component';
import { PopoverController } from '@ionic/angular';

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
    public popoverController: PopoverController
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

  public async createPopover(event: any) {
    const popover = await this.popoverController.create({
      component: MenuComponent,
      event,
      translucent: true
    });
    return await popover.present();
  }

}
