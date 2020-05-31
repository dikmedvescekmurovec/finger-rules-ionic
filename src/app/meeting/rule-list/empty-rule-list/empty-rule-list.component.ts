import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-empty-rule-list',
  templateUrl: './empty-rule-list.component.html',
  styleUrls: ['./empty-rule-list.component.scss'],
})
export class EmptyRuleListComponent implements OnInit {

  constructor(private router: Router, private analytics: AnalyticsService) { }

  ngOnInit() { }

  /**
   * Go to help page
   */
  public helpPage() {
    this.analytics.onHelpClicked();
    this.router.navigate(['help'], { state: { cameFromMeeting: true } });
  }
}
