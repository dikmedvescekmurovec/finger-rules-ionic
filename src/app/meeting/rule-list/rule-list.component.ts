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
      type: FingerRuleType.FUNNY_REMARK,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 60000),
      username: 'Matevž Skrželj'
    },
    {
      type: FingerRuleType.REPLY,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    },
    {
      type: FingerRuleType.NEW_TOPIC,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    },
    {
      type: FingerRuleType.TECHNICAL,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    },
    {
      type: FingerRuleType.TOO_LONG,
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    }
  ]

  ngOnInit() {
  }

}
