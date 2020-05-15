import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingPageRoutingModule } from './meeting-routing.module';

import { MeetingPage } from './meeting.page';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RuleListComponent } from './rule-list/rule-list.component';
import { FingerRuleComponent } from './rule-list/finger-rule/finger-rule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingPageRoutingModule,
    FlexLayoutModule
  ],
  declarations: [MeetingPage,
    RuleListComponent,
    FingerRuleComponent]
})
export class MeetingPageModule {}
