import { Component, OnInit, Input } from '@angular/core';

export interface FingerRule {
  type: FingerRuleType;
  time: Date;
  username: string;
  message: string;
}

export enum FingerRuleType {
  REPLY = 'Reply',
  TOO_LONG = 'Topic Too Long',
  TECHNICAL = 'Technical Remark',
  NEW_TOPIC = 'New Topic',
  FUNNY_REMARK = 'Funny Remark'
}

@Component({
  selector: 'app-finger-rule',
  templateUrl: './finger-rule.component.html',
  styleUrls: ['./finger-rule.component.scss'],
})
export class FingerRuleComponent implements OnInit {

  @Input()
  fingerRule: FingerRule;

  minutesAgo: number;

  constructor() { }

  ngOnInit() {
    console.log(this.fingerRule);
  }

  /**
   * Formats date to 'minutes ago' type
   * @param date Date to format
   */
  dateAgo(date: any) {
    if (date) {
      const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);
      if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };
      let counter;
      for (const i in intervals) {
        if (i) {
          counter = Math.floor(seconds / intervals[i]);
          if (counter > 0) {
            if (counter === 1) {
              return counter + ' ' + i + ' ago'; // singular (1 day ago)
            } else {
              return counter + ' ' + i + 's ago'; // plural (2 days ago)
            }
          }
        }
      }
    }
    return date;
  }
}
