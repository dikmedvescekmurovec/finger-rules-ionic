import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersPageRoutingModule } from './members-routing.module';

import { MembersPage } from './members.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MembersListComponent } from '../members-list/members-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    IonicModule,
    MembersPageRoutingModule
  ],
  declarations: [MembersPage, MembersListComponent]
})
export class MembersPageModule { }
