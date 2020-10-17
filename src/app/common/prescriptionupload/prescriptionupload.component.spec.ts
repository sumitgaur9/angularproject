import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionuploadComponent } from './prescriptionupload.component';

describe('PrescriptionuploadComponent', () => {
  let component: PrescriptionuploadComponent;
  let fixture: ComponentFixture<PrescriptionuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
