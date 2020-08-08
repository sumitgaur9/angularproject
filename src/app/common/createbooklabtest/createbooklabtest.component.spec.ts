import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebooklabtestComponent } from './createbooklabtest.component';

describe('CreatebooklabtestComponent', () => {
  let component: CreatebooklabtestComponent;
  let fixture: ComponentFixture<CreatebooklabtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebooklabtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebooklabtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
