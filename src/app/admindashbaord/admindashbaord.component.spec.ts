import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashbaordComponent } from './admindashbaord.component';

describe('AdmindashbaordComponent', () => {
  let component: AdmindashbaordComponent;
  let fixture: ComponentFixture<AdmindashbaordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindashbaordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
