import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtechniciandashboardComponent } from './labtechniciandashboard.component';

describe('LabtechniciandashboardComponent', () => {
  let component: LabtechniciandashboardComponent;
  let fixture: ComponentFixture<LabtechniciandashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtechniciandashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtechniciandashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
