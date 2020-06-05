import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { FingerRule } from '../models/finger-rule.model';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedRulesService {

  public selectedRules: FingerRule[] = [];

  constructor(private db: DatabaseService, private analytics: AnalyticsService) { }

  private selectChangeSource = new Subject<void>();
  public selectChange$ = this.selectChangeSource.asObservable();

  /**
   * Selects rule for multiple select
   * @param rule Rule to select.
   */
  selectRule(rule) {
    this.selectedRules.push(rule);
    this.selectChangeSource.next();
  }

  /**
   * Deselects rule for multiple select
   * @param rule Rule to deselect.
   */
  deselectRule(rule) {
    this.selectedRules = this.selectedRules.filter(r => rule.id !== r.id);
    this.selectChangeSource.next();
  }

  /**
   * Returns true if there are no rules selected.
   */
  isEmpty() {
    return this.selectedRules.length === 0;
  }

  /**
   * Removes all selected rules from the database.
   */
  removeSelected() {
    this.analytics.onFingerRulesDeleted(this.selectedRules.length);
    for (const rule of this.selectedRules) {
      this.db.removeRule(rule.id);
    }
  }

  /**
   * Deselects all selected rules.
   */
  clear() {
    this.selectedRules = [];
    this.selectChangeSource.next();
  }

  /**
   * Returns true if rule is already selected.
   * @param rule Rule to check.
   */
  isSelected(rule) {
    return this.selectedRules.some(r => r.id === rule.id);
  }
}
