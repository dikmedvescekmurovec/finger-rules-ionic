import { Component, OnInit, OnDestroy } from '@angular/core';
import { FingerRule, FingerRuleType } from './finger-rule/finger-rule.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit, OnDestroy {

  public isAdmin: boolean;

  public fingerRules: FingerRule[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private db: DatabaseService) { }

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
        timestamp: new Date(Date.now() - 120000),
        username: 'Matevž Skrželj'
      }
    )
  }

  ngOnInit() {
    this.db.getFingerRules().subscribe(rules => this.fingerRules = rules);
    this.db.getIsAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
    this.subscriptions.push(
      this.db.getNewFingerRules().subscribe(snapshot => this.fingerRules.unshift(snapshot.payload.val()))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
