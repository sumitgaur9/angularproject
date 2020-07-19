import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseeditdisplaylistComponent } from './nurseeditdisplaylist.component';

describe('NurseeditdisplaylistComponent', () => {
  let component: NurseeditdisplaylistComponent;
  let fixture: ComponentFixture<NurseeditdisplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseeditdisplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseeditdisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
