import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklabtestComponent } from './booklabtest.component';

describe('BooklabtestComponent', () => {
  let component: BooklabtestComponent;
  let fixture: ComponentFixture<BooklabtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooklabtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklabtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
