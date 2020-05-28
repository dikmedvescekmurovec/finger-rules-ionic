import { Component, OnInit } from '@angular/core';
import { FingerRuleType } from 'src/app/models/finger-rule.model';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import * as moment from 'moment';
import { PopoverController } from '@ionic/angular';
import { FingerRuleMenuComponent } from '../../finger-rule-menu/finger-rule-menu.component';

@Component({
  selector: 'app-rule-input',
  templateUrl: './rule-input.component.html',
  styleUrls: ['./rule-input.component.scss'],
})
export class RuleInputComponent implements OnInit {

  public type = FingerRuleType.NEW_TOPIC;
  public message: string;

  constructor(
    private auth: AuthService,
    private db: DatabaseService,
    public popoverController: PopoverController
  ) { }

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

  async chooseRuleType(event: any) {
    const popover = await this.popoverController.create({
      component: FingerRuleMenuComponent,
      event,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();

    this.type = data as FingerRuleType;
  }

}
