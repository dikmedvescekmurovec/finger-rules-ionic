import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplainedPageRoutingModule } from './explained-routing.module';

import { ExplainedPage } from './explained.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FingerRuleComponent } from '../meeting/rule-list/finger-rule/finger-rule.component';
import { KebabCasePipe } from '../kebab-case.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplainedPageRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    ExplainedPage,
    FingerRuleComponent,
    KebabCasePipe
  ]
})
export class ExplainedPageModule { }
