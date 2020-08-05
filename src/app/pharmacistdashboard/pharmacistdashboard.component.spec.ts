import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistdashboardComponent } from './pharmacistdashboard.component';

describe('PharmacistdashboardComponent', () => {
  let component: PharmacistdashboardComponent;
  let fixture: ComponentFixture<PharmacistdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
