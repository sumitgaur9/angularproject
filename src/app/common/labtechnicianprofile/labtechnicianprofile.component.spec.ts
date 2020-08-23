import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtechnicianprofileComponent } from './labtechnicianprofile.component';

describe('LabtechnicianprofileComponent', () => {
  let component: LabtechnicianprofileComponent;
  let fixture: ComponentFixture<LabtechnicianprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtechnicianprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtechnicianprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
