import { Component, OnInit } from '@angular/core';
import { FingerRuleType, FingerRule } from '../meeting/rule-list/finger-rule/finger-rule.component';

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
      priorityLevel: 'Lowest Priority',
      username: 'You have a new topic you want to discuss.',
      message: ''
    },
    {
      id: 'reply',
      type: FingerRuleType.REPLY,
      priorityLevel: 'Low Priority',
      username: 'You have a reply or a direct question about the current topic.',
      message: ''
    },
    {
      id: 'too-long',
      type: FingerRuleType.TOO_LONG,
      priorityLevel: 'Medium priority',
      username: 'You feel like you have enough information on the topic. Topic should end soon.',
      message: ''
    },
    {
      id: 'technical',
      type: FingerRuleType.TECHNICAL,
      priorityLevel: 'High Priority',
      username: 'You are having technical difficulties (can’t hear somebody, presentation not working, ...)',
      message: ''
    },
    {
      id: 'funny-remark',
      type: FingerRuleType.FUNNY_REMARK,
      priorityLevel: 'Highest Priority',
      username: 'You have a joke or a funny remark. Timing is most important in jokes, so they get top priority.',
      message: ''
    }
  ]

  ngOnInit() {
  }

}
