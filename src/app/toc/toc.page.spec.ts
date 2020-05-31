import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TocPage } from './toc.page';

describe('TocPage', () => {
  let component: TocPage;
  let fixture: ComponentFixture<TocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
