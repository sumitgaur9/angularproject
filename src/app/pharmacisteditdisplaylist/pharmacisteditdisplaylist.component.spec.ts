import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacisteditdisplaylistComponent } from './pharmacisteditdisplaylist.component';

describe('PharmacisteditdisplaylistComponent', () => {
  let component: PharmacisteditdisplaylistComponent;
  let fixture: ComponentFixture<PharmacisteditdisplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacisteditdisplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacisteditdisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
