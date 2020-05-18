import { Component, OnInit } from '@angular/core';
import { FingerRule, FingerRuleType } from '../meeting/rule-list/finger-rule/finger-rule.component';

@Component({
  selector: 'app-explained',
  templateUrl: './explained.page.html',
  styleUrls: ['./explained.page.scss'],
})
export class ExplainedPage implements OnInit {

  constructor() { }

  public ruleListExplained: FingerRule[] = [
    {
      id: 'new-topic',
      type: FingerRuleType.NEW_TOPIC,
      priorityLevelDescription: 'Lowest Priority',
      username: 'You have a new topic you want to discuss.',
      message: '',
      priorityLevel: 4
    },
    {
      id: 'reply',
      type: FingerRuleType.REPLY,
      priorityLevelDescription: 'Low Priority',
      username: 'You have a reply or a direct question about the current topic.',
      message: '',
      priorityLevel: 3
    },
    {
      id: 'too-long',
      type: FingerRuleType.TOO_LONG,
      priorityLevelDescription: 'Medium priority',
      username: 'You feel like you have enough information on the topic. Topic should end soon.',
      message: '',
      priorityLevel: 2
    },
    {
      id: 'technical',
      type: FingerRuleType.TECHNICAL,
      priorityLevelDescription: 'High Priority',
      username: 'You are having technical difficulties (can’t hear somebody, presentation not working, ...)',
      message: '',
      priorityLevel: 1
    },
    {
      id: 'funny-remark',
      type: FingerRuleType.FUNNY_REMARK,
      priorityLevelDescription: 'Highest Priority',
      username: 'You have a joke or a funny remark. Timing is most important in jokes, so they get top priority.',
      message: '',
      priorityLevel: 0
    }
  ]

  ngOnInit() {
  }

}
