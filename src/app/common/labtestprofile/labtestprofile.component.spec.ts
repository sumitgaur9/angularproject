import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtestprofileComponent } from './labtestprofile.component';

describe('LabtestprofileComponent', () => {
  let component: LabtestprofileComponent;
  let fixture: ComponentFixture<LabtestprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtestprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtestprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
