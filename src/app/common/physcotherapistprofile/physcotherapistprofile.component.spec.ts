import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyscotherapistprofileComponent } from './physcotherapistprofile.component';

describe('PhyscotherapistprofileComponent', () => {
  let component: PhyscotherapistprofileComponent;
  let fixture: ComponentFixture<PhyscotherapistprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhyscotherapistprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyscotherapistprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
