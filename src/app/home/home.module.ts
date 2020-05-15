import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntryFormComponent } from './entry-form/entry-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [HomePage,
    EntryFormComponent]
})
export class HomePageModule { }
