import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { FingerRule, FingerRuleType } from 'src/app/models/finger-rule.model';
import { SelectedRulesService } from 'src/app/selected-rules.service';
import { DatabaseService } from 'src/app/services/database.service';
import { FingerRule, FingerRuleType } from 'src/app/models/finger-rule.model';

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

  removeRule(id: string) {
    this.db.removeRule(id);
  }

  randomType(enumeration) {
    const values = Object.keys(enumeration);
    const index = Math.floor(Math.random() * values.length);
    const enumKey = values[index];
    return { index, type: enumeration[enumKey] };
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
    const randRule =
    {
      id: moment().valueOf().toString(),
      type: randType.type,
      message: this.randomText(),
      timestamp: moment().toISOString(),
      username: this.randomName(),
      priorityLevel: randType.index
    };

    this.db.addRule(randRule);
  }

  pushRule(rule: FingerRule) {
    this.fingerRules.push(rule);
    this.fingerRules.sort((a, b) => a.priorityLevel - b.priorityLevel);
  }

  ngOnInit() {
    this.db.getIsAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
    this.subscriptions.push(
      this.db.getFingerRules().subscribe(rules => {
        this.fingerRules = rules.sort((a, b) => a.priorityLevel - b.priorityLevel);
      })
    );
  }

  public trackByFn(index: number, item: FingerRule) {
    return item.id;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
