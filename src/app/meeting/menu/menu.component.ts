import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController, ModalController } from '@ionic/angular';
import { Clipboard } from '@angular/cdk/clipboard';
import { MembersPage } from 'src/app/members/members.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private clipboard: Clipboard,
    private toastController: ToastController,
    private popoverController: PopoverController,
    public modalController: ModalController
  ) { }

  ngOnInit() { }

  public async copyShareInfo() {
    this.clipboard.copy(`To join my Finger Rules meeting, click this link ${window.location.href}`);
    const toast = await this.toastController.create({
      message: 'Joining info has been copied to the clipboard.',
      duration: 5000
    });
    toast.present();
    this.popoverController.dismiss();
  }

  public async showMembers() {
    const modal = await this.modalController.create({
      component: MembersPage
    });
    this.popoverController.dismiss();
    return await modal.present();
  }

}
