import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  public users$: Observable<User[]>;

  constructor(
    private modalController: ModalController,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.users$ = this.db.getUsers();
  }

  public dismissModal() {
    this.modalController.dismiss();
  }

}
