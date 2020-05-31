import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.page.html',
  styleUrls: ['./toc.page.scss'],
})
export class TocPage implements OnInit {

  constructor(private router: Router, private seo: SEOService) { }

  ngOnInit() {
  }

  public back() {
    this.router.navigate(['/help']);
  }

  ionViewWillEnter() {
    this.seo.setTitle('Finger Rules Terms and Conditions');
  }

}
