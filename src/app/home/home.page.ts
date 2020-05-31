import { Component } from '@angular/core';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(private seo: SEOService) { }

  ionViewWillEnter() {
    this.seo.setTitle('Finger Rules');
  }

}
