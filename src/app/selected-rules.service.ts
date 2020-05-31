import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { FingerRule } from './models/finger-rule.model';
import { AnalyticsService } from './services/analytics.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedRulesService {

  public selectedRules: FingerRule[] = [];

  constructor(private db: DatabaseService, private analytics: AnalyticsService) { }

  private selectChangeSource = new Subject<void>();
  public selectChange$ = this.selectChangeSource.asObservable();

  selectRule(rule) {
    this.selectedRules.push(rule);
    this.selectChangeSource.next();
  }

  deselectRule(rule) {
    this.selectedRules = this.selectedRules.filter(r => rule.id !== r.id);
    this.selectChangeSource.next();
  }

  isEmpty() {
    return this.selectedRules.length === 0;
  }

  removeAll() {
    this.analytics.onFingerRulesDeleted(this.selectedRules.length);
    for (const rule of this.selectedRules) {
      this.db.removeRule(rule.id);
    }
  }

  clear() {
    this.selectedRules = [];
    this.selectChangeSource.next();
  }

  isSelected(rule) {
    return this.selectedRules.some(r => r.id === rule.id);
  }
}
