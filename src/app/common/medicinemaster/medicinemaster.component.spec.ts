import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinemasterComponent } from './medicinemaster.component';

describe('MedicinemasterComponent', () => {
  let component: MedicinemasterComponent;
  let fixture: ComponentFixture<MedicinemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
