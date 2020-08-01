import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitforallComponent } from './visitforall.component';

describe('VisitforallComponent', () => {
  let component: VisitforallComponent;
  let fixture: ComponentFixture<VisitforallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitforallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitforallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
