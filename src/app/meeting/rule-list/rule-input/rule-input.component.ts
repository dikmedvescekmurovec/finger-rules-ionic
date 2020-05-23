import { Component, OnInit } from '@angular/core';
import { FingerRuleType } from 'src/app/models/finger-rule.model';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import * as moment from 'moment';
import { MenuController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-rule-input',
  templateUrl: './rule-input.component.html',
  styleUrls: ['./rule-input.component.scss'],
})
export class RuleInputComponent implements OnInit {

  public type = FingerRuleType.NEW_TOPIC;
  public message: string;

  constructor(private auth: AuthService, private db: DatabaseService, private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  send() {
    this.db.addRule(
      {
        uid: this.auth.getUid(),
        id: moment().valueOf().toString(),
        type: this.type,
        message: this.message || null,
        timestamp: moment().toISOString(),
        username: this.auth.getUsername(),
        priorityLevel: Object.values(FingerRuleType).indexOf(this.type)
      }
    );
    this.message = '';
  }

  async chooseRuleType() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose a Finger Rule',
      buttons: [
        {
          text: 'Funny Remark',
          icon: 'ellipsis-horizontal',
          cssClass: 'funny-remark',
          handler: () => {
            this.type = FingerRuleType.FUNNY_REMARK;
          }
        },
        {
          text: 'Technical Remark',
          icon: 'ellipsis-horizontal',
          cssClass: 'technical-remark',
          handler: () => {
            this.type = FingerRuleType.TECHNICAL;
          }
        },
        {
          text: 'Topic Too Long',
          icon: 'ellipsis-horizontal',
          cssClass: 'topic-too-long',
          handler: () => {
            this.type = FingerRuleType.TOO_LONG;
          }
        },
        {
          text: 'Reply',
          icon: 'ellipsis-horizontal',
          cssClass: 'reply',
          handler: () => {
            this.type = FingerRuleType.REPLY;
          }
        },
        {
          text: 'New Topic',
          icon: 'ellipsis-horizontal',
          cssClass: 'new-topic',
          handler: () => {
            this.type = FingerRuleType.NEW_TOPIC;
          }
        }]
    });
    await actionSheet.present();
  }

}
