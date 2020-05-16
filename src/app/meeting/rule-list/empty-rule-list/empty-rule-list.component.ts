import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-rule-list',
  templateUrl: './empty-rule-list.component.html',
  styleUrls: ['./empty-rule-list.component.scss'],
})
export class EmptyRuleListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  /**
   * Go to help page
   */
  helpPage() {
    this.router.navigateByUrl('help');
  }
}
