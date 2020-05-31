import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.page.html',
  styleUrls: ['./toc.page.scss'],
})
export class TocPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public back() {
    this.router.navigate(['/help']);
  }

}
