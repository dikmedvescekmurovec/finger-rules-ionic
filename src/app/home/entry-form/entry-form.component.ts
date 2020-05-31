import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
})
export class EntryFormComponent implements OnInit {
  public doesMeetingExist: boolean;

  public entryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private db: DatabaseService,
    private analytics: AnalyticsService
  ) {
    this.entryForm = this.formBuilder.group({
      username: ['', Validators.required],
      meeting: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    this.entryForm.patchValue({ username: this.auth.getUsername() });
    this.activatedRoute.queryParamMap.subscribe(
      params => {
        if (params.get('meeting')) {
          this.entryForm.patchValue(
            {
              meeting: params.get('meeting')
            }
          );
          this.doesMeetingExist = true;
        }
      }
    );
  }

  /**
   * Switches from create a meeting to join with ID view.
   */
  switchView() {
    this.entryForm.get('meeting').reset();
    this.doesMeetingExist = !this.doesMeetingExist;

    this.analytics.onSwitchedView(this.doesMeetingExist);
  }

  /**
   * Creates meeting and redirects to meeting page.
   */
  async startMeeting() {
    let meetingID = null;
    const username = this.entryForm.get('username').value;
    this.auth.setUsername(username);

    if (this.doesMeetingExist) {
      meetingID = this.entryForm.get('meeting').value;
      this.analytics.onMeetingJoinClicked();
    } else {
      const meetingName = this.entryForm.get('meeting').value;
      meetingID = this.db.generateMeetingID(meetingName);
      await this.db.createMeeting(meetingID, meetingName);
      this.analytics.onMeetingStartClicked();
    }

    this.router.navigate(['meeting', meetingID]);
  }

  /**
   * Go to help page
   */
  public helpPage() {
    this.analytics.onHelpClicked();
    this.router.navigate(['help']);
  }

}
