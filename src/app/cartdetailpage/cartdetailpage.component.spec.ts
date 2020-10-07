import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartdetailpageComponent } from './cartdetailpage.component';

describe('CartdetailpageComponent', () => {
  let component: CartdetailpageComponent;
  let fixture: ComponentFixture<CartdetailpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartdetailpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartdetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
