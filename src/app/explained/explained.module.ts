import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { KebabCasePipe } from '../kebab-case.pipe';
import { FingerRuleComponent } from '../meeting/rule-list/finger-rule/finger-rule.component';
import { ExplainedPageRoutingModule } from './explained-routing.module';
import { ExplainedPage } from './explained.page';




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
