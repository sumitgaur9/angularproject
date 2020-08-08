import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelabtestComponent } from './createlabtest.component';

describe('CreatelabtestComponent', () => {
  let component: CreatelabtestComponent;
  let fixture: ComponentFixture<CreatelabtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelabtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelabtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
