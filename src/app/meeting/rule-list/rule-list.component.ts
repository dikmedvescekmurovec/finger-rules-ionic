import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { FingerRule, FingerRuleType } from 'src/app/models/finger-rule.model';
import { SelectedRulesService } from 'src/app/services/selected-rules.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit, OnDestroy {

  @Input()
  public exists: boolean;

  public isAdmin: boolean;

  public fingerRules: FingerRule[];

  private subscriptions: Subscription[] = [];

  constructor(
    private db: DatabaseService,
    private selectedRulesService: SelectedRulesService,
    private toastController: ToastController,
    private router: Router,
    public auth: AuthService
  ) { }

  public selectedRules: FingerRule[] = []

  removeRule(id: string) {
    this.db.removeRule(id);
  }

  pushRule(rule: FingerRule) {
    this.fingerRules.push(rule);
    this.fingerRules.sort((a, b) => a.priorityLevel - b.priorityLevel);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.db.getIsAdmin().subscribe(isAdmin => this.isAdmin = isAdmin)
    );
    this.subscriptions.push(
      this.db.getFingerRules().subscribe(rules => {
        this.fingerRules = rules.sort((a, b) => a.priorityLevel - b.priorityLevel);
        if (rules.length === 0 && !this.exists) {
          this.createMeetingDoesNotExistToast();
        }
      })
    );
  }

  private async createMeetingDoesNotExistToast() {
    const toast = await this.toastController.create({
      message: 'Meeting does not exist.',
      duration: 5000
    });
    toast.present();
    setTimeout(() => this.router.navigate(['/']), 500);
  }

  public trackByFn(index: number, item: FingerRule) {
    return item.id;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
