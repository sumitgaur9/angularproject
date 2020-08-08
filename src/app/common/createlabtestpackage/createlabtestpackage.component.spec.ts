import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelabtestpackageComponent } from './createlabtestpackage.component';

describe('CreatelabtestpackageComponent', () => {
  let component: CreatelabtestpackageComponent;
  let fixture: ComponentFixture<CreatelabtestpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelabtestpackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelabtestpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
