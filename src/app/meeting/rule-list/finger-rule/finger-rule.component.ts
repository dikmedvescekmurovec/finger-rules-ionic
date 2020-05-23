import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FingerRule } from 'src/app/models/finger-rule.model';
import { SelectedRulesService } from 'src/app/selected-rules.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-finger-rule',
  templateUrl: './finger-rule.component.html',
  styleUrls: ['./finger-rule.component.scss'],
})
export class FingerRuleComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private selectedRulesService: SelectedRulesService,
    private db: DatabaseService
  ) { }

  public firstDraw = true;

  @Input()
  public fingerRule: FingerRule;

  @Input()
  public isAdmin: boolean;

  @Input()
  public isOwner: boolean;

  @Input()
  public selectable = true;

  public isSelected = false;

  @ViewChild('deselected') deselectedRef: ElementRef;

  @Input()
  public deletable = true;

  @Output()
  remove: EventEmitter<string> = new EventEmitter();

  public humanizedTimestamp: string;

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.humanizedTimestamp = moment(this.fingerRule.timestamp).fromNow();

    this.subscriptions.push(
      this.selectedRulesService.selectChange$.subscribe(
        () => this.isSelected = this.selectedRulesService.isSelected(this.fingerRule)
      )
    );

    this.subscriptions.push(interval(1000 * 60).subscribe(() => {
      this.humanizedTimestamp = moment(this.fingerRule.timestamp).fromNow()
    }));
  }

  ngAfterViewInit() {
    setTimeout(() => document.querySelector(`#${CSS.escape(this.fingerRule.id)}`).className += ' fade-in', 10);
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.selectedRulesService.deselectRule(this.fingerRule);
    }, 0);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
