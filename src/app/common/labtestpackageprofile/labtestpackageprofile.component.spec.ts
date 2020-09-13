import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtestpackageprofileComponent } from './labtestpackageprofile.component';

describe('LabtestpackageprofileComponent', () => {
  let component: LabtestpackageprofileComponent;
  let fixture: ComponentFixture<LabtestpackageprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtestpackageprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtestpackageprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
