import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtechnicianeditdisplaylistComponent } from './labtechnicianeditdisplaylist.component';

describe('LabtechnicianeditdisplaylistComponent', () => {
  let component: LabtechnicianeditdisplaylistComponent;
  let fixture: ComponentFixture<LabtechnicianeditdisplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtechnicianeditdisplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtechnicianeditdisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
