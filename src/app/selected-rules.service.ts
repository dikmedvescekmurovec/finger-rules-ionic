import { Injectable } from '@angular/core';
import { FingerRule } from './models/finger-rule.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedRulesService {

  public selectedRules: FingerRule[] = [];

  constructor() { }


  selectRule(rule) {
    this.selectedRules.push(rule);
  }

  deselectRule(rule) {
    this.selectedRules = this.selectedRules.filter(r => rule.id !== r.id);
  }

  isEmpty() {
    return this.selectedRules.length === 0;
  }
}
