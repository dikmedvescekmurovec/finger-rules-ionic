import { Component, OnInit } from '@angular/core';
import { FingerRule, FingerRuleType } from './finger-rule/finger-rule.component';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit {

  constructor() { }

  fingerRules: FingerRule[] = [
    {
      id: '1',
      type: FingerRuleType.FUNNY_REMARK,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 60000),
      username: 'Matevž Skrželj'
    },
    {
      id: '2',
      type: FingerRuleType.REPLY,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    },
    {
      id: '3',
      type: FingerRuleType.NEW_TOPIC,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    },
    {
      id: '4',
      type: FingerRuleType.TECHNICAL,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    },
    {
      id: '5',
      type: FingerRuleType.TOO_LONG,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    }
  ]

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
  }

}
