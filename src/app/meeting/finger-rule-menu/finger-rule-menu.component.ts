import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FingerRuleType } from 'src/app/models/finger-rule.model';
@Component({
  selector: 'app-finger-rule-menu',
  templateUrl: './finger-rule-menu.component.html',
  styleUrls: ['./finger-rule-menu.component.scss']
})
export class FingerRuleMenuComponent implements OnInit {

  public fingerRuleType = FingerRuleType;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  public selectFingerRuleType(fingerRuleType: FingerRuleType) {
    this.popoverController.dismiss(fingerRuleType);
  }

}
