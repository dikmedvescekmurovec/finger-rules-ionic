import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { DatabaseService } from '../services/database.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent implements OnInit {

  public users$: Observable<User[]>;

  constructor(
    private db: DatabaseService,
    private clipboard: Clipboard,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.users$ = this.db.getUsers();
  }

  public async copyShareInfo() {
    this.clipboard.copy(`To join my Finger Rules meeting, click this link ${window.location.href}`);
    const toast = await this.toastController.create({
      message: 'Joining info has been copied to the clipboard.',
      duration: 5000
    });
    toast.present();
  }

}
