import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { SelectedRulesService } from 'src/app/selected-rules.service';
import { FingerRule } from 'src/app/models/finger-rule.model';

@Component({
  selector: 'app-finger-rule',
  templateUrl: './finger-rule.component.html',
  styleUrls: ['./finger-rule.component.scss'],
})
export class FingerRuleComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private selectedRulesService: SelectedRulesService) { }

  public firstDraw = true;

  @Input()
  fingerRule: FingerRule;

  @Input()
  private isAdmin: boolean;

  public isSelected = false;

  @ViewChild('deselected') deselectedRef: ElementRef;

  @Output()
  selected: EventEmitter<FingerRule> = new EventEmitter<FingerRule>();

  @Output()
  deselected: EventEmitter<FingerRule> = new EventEmitter<FingerRule>();

  @Input()
  canDelete = true;

  @Output()
  remove: EventEmitter<string> = new EventEmitter();

  public humanizedTimestamp: string;

  ngOnInit() {
    if (this.fingerRule.timestamp) {
      this.humanizedTimestamp = moment(this.fingerRule.timestamp).fromNow();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => document.querySelector(`#${CSS.escape(this.fingerRule.id)}`).className += ' fade-in', 10);
  }

  ngOnDestroy() {
    console.log(`rule destroyed`, this.fingerRule);
    setTimeout(() => {
      this.selectedRulesService.deselectRule(this.fingerRule);
    }, 0);
  }

  /**
   * Emits remove rule event
   */
  removeRule() {
    this.deselected.emit(this.fingerRule);
    document.querySelector(`#${CSS.escape(this.fingerRule.id)}`).className += ' fade-out'
    setTimeout(() => this.remove.emit(this.fingerRule.id), 200);
  }

  selectRule() {
    this.selectedRulesService.selectRule(this.fingerRule)
    this.isSelected = true;
    this.firstDraw = false;
  }

  deselectRule() {
    this.selectedRulesService.deselectRule(this.fingerRule)
    this.isSelected = false;
  }

}
