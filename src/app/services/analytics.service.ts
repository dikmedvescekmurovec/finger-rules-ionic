import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { FingerRule } from '../models/finger-rule.model';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private analytics: AngularFireAnalytics,
    private db: DatabaseService,
    private auth: AuthService
  ) { }

  public onFingerRuleTypeSelected(fingerRule: FingerRule) {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('finger_rule_type_select', { type: fingerRule.toString(), mid: meetingID });
    }
  }

  public onShareClicked() {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('share', { method: 'clipboard', content_type: 'meeting', content_id: meetingID });
    }
  }

  public onMeetingJoined(exists: boolean) {
    if (exists) {
      const meetingID = this.db.getMeetingID();
      const uid = this.auth.getUid();

      this.analytics.logEvent('meeting_joined', { mid: meetingID, uid });
    } else {
      this.analytics.logEvent('meeting_does_not_exist');
    }
  }

  public onMenuClicked() {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('menu_click', { mid: meetingID });
    }
  }

  public onShowMembersClicked() {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('members_show', { mid: meetingID });
    }
  }

  public onFingerRuleSent(fingerRule: FingerRule) {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('rule_add', { mid: meetingID, type: fingerRule.type, with_message: !!fingerRule.message });
    }
  }

  public onFingerRuleDeleted(fingerRule: FingerRule) {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('rule_delete', { mid: meetingID, type: fingerRule.type });
    }
  }

  public onFingerRuleSelected() {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('finger_rule_select', { mid: meetingID });
    }
  }

  public onFingerRuleDeselected() {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('finger_rule_deselect', { mid: meetingID });
    }
  }

  public onFingerRulesDeleted(deleted: number) {
    const meetingID = this.db.getMeetingID();

    if (meetingID) {
      this.analytics.logEvent('finger_rules_delete', { mid: meetingID, number_of_deleted_finger_rules: deleted });
    }
  }

  public onSwitchedView(meetingView: boolean) {
    if (meetingView) {
      this.analytics.logEvent('meeting_join_view');
    } else {
      this.analytics.logEvent('meeting_create_view');
    }
  }

  public onMeetingStartClicked() {
    this.analytics.logEvent('meeting_create');
  }

  public onMeetingJoinClicked() {
    this.analytics.logEvent('meeting_join');
  }

  public onHelpClicked() {
    this.analytics.logEvent('help');
  }

}
