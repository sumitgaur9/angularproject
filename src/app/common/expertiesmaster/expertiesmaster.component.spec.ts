import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiesmasterComponent } from './expertiesmaster.component';

describe('ExpertiesmasterComponent', () => {
  let component: ExpertiesmasterComponent;
  let fixture: ComponentFixture<ExpertiesmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertiesmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertiesmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
