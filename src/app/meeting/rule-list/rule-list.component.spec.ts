import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RuleListComponent } from './rule-list.component';

describe('RuleListComponent', () => {
  let component: RuleListComponent;
  let fixture: ComponentFixture<RuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
