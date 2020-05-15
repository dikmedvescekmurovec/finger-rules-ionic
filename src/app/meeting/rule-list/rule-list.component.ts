import { Component, OnInit } from '@angular/core';
import { FingerRule } from './finger-rule/finger-rule.component';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit {

  constructor() { }

  fingerRules: FingerRule[] = [
    {
      type: 'Reply',
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 60000),
      username: 'Matevž Skrželj'
    },
    {
      type: 'Reply',
      message: 'Ali so kumare res samo za vlaganje? Res samo za vlaganje? Guyz?',
      time: new Date(Date.now() - 120000),
      username: 'Matevž Skrželj'
    }
  ]

  ngOnInit() {
  }

}
