import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FingerRule } from './models/finger-rule.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedRulesService {

  public selectedRules: FingerRule[] = [];

  constructor() { }

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

  clear() {
    this.selectedRules = [];
    this.selectChangeSource.next();
  }

  isSelected(rule) {
    console.log(this.selectedRules.some(r => r.id === rule.id));
    console.log(this.selectedRules, rule);
    return this.selectedRules.some(r => r.id === rule.id);
  }
}
