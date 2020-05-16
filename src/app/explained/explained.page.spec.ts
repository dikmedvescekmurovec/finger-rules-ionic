import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExplainedPage } from './explained.page';

describe('ExplainedPage', () => {
  let component: ExplainedPage;
  let fixture: ComponentFixture<ExplainedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplainedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplainedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
