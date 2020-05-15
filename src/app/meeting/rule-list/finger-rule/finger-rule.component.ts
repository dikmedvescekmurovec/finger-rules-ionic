import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { createAnimation } from '@ionic/core';
import * as moment from 'moment';

export interface FingerRule {
  id: string;
  type: FingerRuleType;
  timestamp: Date;
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
export class FingerRuleComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  @Input()
  fingerRule: FingerRule;

  @Input()
  private isAdmin: boolean;

  @Output()
  remove: EventEmitter<string> = new EventEmitter();

  public humanizedTimestamp: string;

  ngOnInit() {
    this.humanizedTimestamp = moment(this.fingerRule.timestamp).fromNow();
  }

  ngAfterViewInit() {
    createAnimation()
      .addElement(document.querySelector(`#${CSS.escape(this.fingerRule.id)}`))
      .easing('ease-in-out')
      .duration(1000)
      .direction('alternate')
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'scale(0)', opacity: '0' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]).play();
  }

  ngOnDestroy() {
    createAnimation()
      .addElement(document.querySelector(`#${CSS.escape(this.fingerRule.id)}`))
      .easing('ease-in-out')
      .duration(1000)
      .direction('alternate')
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'scale(0)', opacity: '0' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]).play();
  }

  /**
   * Emits remove rule event
   */
  removeRule() {
    this.remove.emit(this.fingerRule.id);
  }

}
