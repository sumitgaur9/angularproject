import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LablistComponent } from './labtestlist.component';

describe('LablistComponent', () => {
  let component: LablistComponent;
  let fixture: ComponentFixture<LablistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LablistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LablistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
