import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistVisitCompleteIntimationComponent } from './pharmacist-visit-complete-intimation.component';

describe('PharmacistVisitCompleteIntimationComponent', () => {
  let component: PharmacistVisitCompleteIntimationComponent;
  let fixture: ComponentFixture<PharmacistVisitCompleteIntimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistVisitCompleteIntimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistVisitCompleteIntimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
