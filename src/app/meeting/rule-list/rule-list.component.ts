import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectedRulesService } from 'src/app/selected-rules.service';
import { DatabaseService } from 'src/app/services/database.service';
import { FingerRule, FingerRuleType } from './finger-rule/finger-rule.component';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit, OnDestroy {

  public isAdmin: boolean;

  public fingerRules: FingerRule[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private db: DatabaseService,
    private selectedRulesService: SelectedRulesService) { }

  public selectedRules: FingerRule[] = []

  removeRule(ruleID) {
    this.fingerRules = this.fingerRules.filter(
      rule => rule.id !== ruleID
    );
    this.selectedRulesService.deselectRule({id: ruleID});
  }

  randomType(enumeration) {
    const values = Object.keys(enumeration);
    const index = Math.floor(Math.random() * values.length);
    const enumKey = values[index];
    return {index, type: enumeration[enumKey]};
  }

  private randomName() {
    const names = ['Matevž', 'Jaka', 'Tone', 'Bine', 'Cene'];
    const surnames = ['Ani', 'Boni', 'Celjak', 'Dobnik'];
    return names[Math.floor(Math.random() * names.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)];
  }

  private randomText() {
    const randomSentences = [
      'She folded her handkerchief neatly.',
      'Bill ran from the giraffe toward the dolphin.',
      'He had a vague sense that trees gave birth to dinosaurs.',
      'The best key lime pie is still up for debate.',
      'She wore green lipstick like a fashion icon.',
      'Art doesn\'t have to be intentional.',
      'I purchased a baby clown from the Russian terrorist black market.',
      'The fish listened intently to what the frogs had to say.'];
    return randomSentences[Math.floor(Math.random() * randomSentences.length)]
  }

  generateRule() {
    const randType = this.randomType(FingerRuleType);
    this.pushRule(
      {
        id: Math.floor(Math.random()*1000000000).toString(),
        type: randType.type,
        message: this.randomText(),
        timestamp: new Date(Date.now() - 120000),
        username: this.randomName(),
        priorityLevel: randType.index
      }
    )
  }

  pushRule(rule: FingerRule) {
    this.fingerRules.push(rule);
    this.fingerRules.sort((a, b) => a.priorityLevel - b.priorityLevel);
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
