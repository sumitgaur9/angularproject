import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtestpackagelistComponent } from './labtestpackagelist.component';

describe('LabtestpackagelistComponent', () => {
  let component: LabtestpackagelistComponent;
  let fixture: ComponentFixture<LabtestpackagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtestpackagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtestpackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
