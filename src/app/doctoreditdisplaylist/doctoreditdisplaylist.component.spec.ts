import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEditdisplaylistComponent } from './doctoreditdisplaylist.component';

describe('EditdisplaylistComponent', () => {
  let component: DoctorEditdisplaylistComponent;
  let fixture: ComponentFixture<DoctorEditdisplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorEditdisplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorEditdisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
