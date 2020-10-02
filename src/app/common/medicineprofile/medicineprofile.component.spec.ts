import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineprofileComponent } from './medicineprofile.component';

describe('MedicineprofileComponent', () => {
  let component: MedicineprofileComponent;
  let fixture: ComponentFixture<MedicineprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
