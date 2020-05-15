import { Component, OnInit } from '@angular/core';
import { FingerRule, FingerRuleType } from './finger-rule/finger-rule.component';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit {

  public isAdmin: boolean;

  constructor(private db: DatabaseService) { }

  fingerRules: FingerRule[] = [];

  removeRule(ruleID) {
    this.fingerRules = this.fingerRules.filter(
      rule => rule.id !== ruleID
    );
  }

  generateRule() {
    this.fingerRules.push(
      {
        id: this.fingerRules.length.toString(),
        type: FingerRuleType.TOO_LONG,
        message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
        time: new Date(Date.now() - 120000),
        username: 'Matevž Skrželj'
      }
    )
  }

  ngOnInit() {
    this.db.getFingerRules().subscribe(rules => this.fingerRules = rules);

    this.db.getIsAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
  }

}
