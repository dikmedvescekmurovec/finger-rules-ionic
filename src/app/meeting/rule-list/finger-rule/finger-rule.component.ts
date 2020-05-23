import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FingerRule } from 'src/app/models/finger-rule.model';
import { SelectedRulesService } from 'src/app/selected-rules.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-finger-rule',
  templateUrl: './finger-rule.component.html',
  styleUrls: ['./finger-rule.component.scss'],
})
export class FingerRuleComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private selectedRulesService: SelectedRulesService, private db: DatabaseService) { }

  public firstDraw = true;

  @Input()
  fingerRule: FingerRule;

  @Input()
  public isAdmin: boolean;

  @Input()
  public isOwner: boolean;

  @Input()
  selectable = true;

  public isSelected = false;

  @ViewChild('deselected') deselectedRef: ElementRef;

  @Input()
  deletable = true;

  @Output()
  remove: EventEmitter<string> = new EventEmitter();

  public humanizedTimestamp: string;

  ngOnInit() {
    console.log(this.fingerRule);
    if (this.fingerRule.timestamp) {
      this.humanizedTimestamp = moment(this.fingerRule.timestamp).fromNow();
    }
    this.selectedRulesService.selectChange$.subscribe(
      () => {
        this.isSelected = this.selectedRulesService.isSelected(this.fingerRule)
      }
    )
  }

  ngAfterViewInit() {
    setTimeout(() => document.querySelector(`#${CSS.escape(this.fingerRule.id)}`).className += ' fade-in', 10);
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.selectedRulesService.deselectRule(this.fingerRule);
    }, 0);
  }

  /**
   * Emits remove rule event
   */
  removeRule() {
    this.selectedRulesService.deselectRule(this.fingerRule);
    document.querySelector(`#${CSS.escape(this.fingerRule.id)}`).className += ' fade-out'
    setTimeout(() => this.db.removeRule(this.fingerRule.id), 200);
  }

  selectRule() {
    if (this.canSelect()) {
      this.selectedRulesService.selectRule(this.fingerRule)
      this.firstDraw = false;
    }
  }

  deselectRule() {
    if (this.canSelect()) {
      this.selectedRulesService.deselectRule(this.fingerRule)
    }
  }

  canDelete() {
    return (this.isAdmin || this.isOwner) && this.deletable;
  }

  canSelect() {
    return this.selectable && this.canDelete();
  }

}
