import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadtestreportComponent } from './uploadtestreport.component';

describe('UploadtestreportComponent', () => {
  let component: UploadtestreportComponent;
  let fixture: ComponentFixture<UploadtestreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadtestreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadtestreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
