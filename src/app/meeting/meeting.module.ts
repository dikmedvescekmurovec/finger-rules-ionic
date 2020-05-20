import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IonicModule } from '@ionic/angular';
import { KebabCasePipe } from '../kebab-case.pipe';
import { MeetingPageRoutingModule } from './meeting-routing.module';
import { MeetingPage } from './meeting.page';
import { EmptyRuleListComponent } from './rule-list/empty-rule-list/empty-rule-list.component';
import { FingerRuleComponent } from './rule-list/finger-rule/finger-rule.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleInputComponent } from './rule-list/rule-input/rule-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingPageRoutingModule,
    FlexLayoutModule,
    ClipboardModule
  ],
  declarations: [MeetingPage,
    RuleListComponent,
    FingerRuleComponent,
    KebabCasePipe,
    EmptyRuleListComponent,
    RuleInputComponent],
  providers: [
    Clipboard
  ]
})
export class MeetingPageModule { }
