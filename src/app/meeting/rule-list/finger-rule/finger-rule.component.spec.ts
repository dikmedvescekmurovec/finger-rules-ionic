import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FingerRuleComponent } from './finger-rule.component';

describe('FingerRuleComponent', () => {
  let component: FingerRuleComponent;
  let fixture: ComponentFixture<FingerRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FingerRuleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FingerRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
