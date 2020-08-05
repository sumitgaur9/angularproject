import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasmasterComponent } from './diseasmaster.component';

describe('DiseasmasterComponent', () => {
  let component: DiseasmasterComponent;
  let fixture: ComponentFixture<DiseasmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseasmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
