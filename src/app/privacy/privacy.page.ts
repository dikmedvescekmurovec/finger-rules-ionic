import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  constructor(private router: Router, private seo: SEOService) { }

  ngOnInit() {
  }

  public back() {
    this.router.navigate(['/help']);
  }

  ionViewWillEnter() {
    this.seo.setTitle('Finger Rules Privacy Policy');
  }

}
