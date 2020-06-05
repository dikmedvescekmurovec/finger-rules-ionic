import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { MenuComponent } from './menu/menu.component';
import { PopoverController } from '@ionic/angular';
import { AnalyticsService } from '../services/analytics.service';
import { SEOService } from '../services/seo.service';
import { SelectedRulesService } from '../services/selected-rules.service';

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
    public popoverController: PopoverController,
    private analytics: AnalyticsService,
    private seo: SEOService
  ) { }

  ngOnInit() {
    this.meetingID = this.activatedRoute.snapshot.paramMap.get('meetingID');

    this.seo.setTitle(`Finger Rules - ${this.meetingID}`);

    this.db.setMeetingID(this.meetingID);
    this.db.doesMeetingExist(this.meetingID).subscribe(exists => {
      if (exists) {
        this.db.joinMeeting();
        this.db.getMeetingName(this.meetingID).subscribe(meetingName => this.meetingName = meetingName);
        this.exists = true;
      }
      this.analytics.onMeetingJoined(exists);
    })
  }

  public back() {
    this.router.navigate(['/']);
  }

  public async createPopover(event: any) {
    const popover = await this.popoverController.create({
      component: MenuComponent,
      event,
      translucent: true
    });

    this.analytics.onMenuClicked();

    return await popover.present();
  }

}
