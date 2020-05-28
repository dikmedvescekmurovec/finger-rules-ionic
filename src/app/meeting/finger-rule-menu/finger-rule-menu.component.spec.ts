import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FingerRuleMenuComponent } from './finger-rule-menu.component';

describe('FingerRuleMenuComponent', () => {
  let component: FingerRuleMenuComponent;
  let fixture: ComponentFixture<FingerRuleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FingerRuleMenuComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FingerRuleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
