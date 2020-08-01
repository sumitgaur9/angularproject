import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPatMedHomeDeliveryComponent } from './request-pat-med-home-delivery.component';

describe('RequestPatMedHomeDeliveryComponent', () => {
  let component: RequestPatMedHomeDeliveryComponent;
  let fixture: ComponentFixture<RequestPatMedHomeDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPatMedHomeDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPatMedHomeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
