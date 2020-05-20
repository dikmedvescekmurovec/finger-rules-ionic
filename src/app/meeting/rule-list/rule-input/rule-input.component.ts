import { Component, OnInit } from '@angular/core';
import { FingerRuleType } from 'src/app/models/finger-rule.model';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rule-input',
  templateUrl: './rule-input.component.html',
  styleUrls: ['./rule-input.component.scss'],
})
export class RuleInputComponent implements OnInit {

  public type = FingerRuleType.NEW_TOPIC;
  public message: string;

  constructor(private auth: AuthService, private db: DatabaseService) { }

  ngOnInit() {}

  send(){
    this.db.addRule(
      {
        id: moment().valueOf().toString(),
        type: this.type,
        message: this.message,
        timestamp: moment().toISOString(),
        username: this.auth.getUsername(),
        priorityLevel: Object.keys(FingerRuleType).indexOf(this.type)
      }
    );
  }

}
