import { Injectable } from '@angular/core';
import { FingerRule } from './meeting/rule-list/finger-rule/finger-rule.component';

@Injectable({
  providedIn: 'root'
})
export class SelectedRulesService {

  public selectedRules: FingerRule[] = [];

  constructor() { }


  selectRule(rule) {
    this.selectedRules.push(rule);
    console.log(this.selectedRules);
  }

  deselectRule(rule) {
    console.log(rule.id);
    this.selectedRules = this.selectedRules.filter(r => rule.id !== r.id);
    console.log(this.selectedRules);
  }

  isEmpty() {
    return this.selectedRules.length === 0;
  }
}
