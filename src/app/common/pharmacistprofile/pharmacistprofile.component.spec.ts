import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistprofileComponent } from './pharmacistprofile.component';

describe('PharmacistprofileComponent', () => {
  let component: PharmacistprofileComponent;
  let fixture: ComponentFixture<PharmacistprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
