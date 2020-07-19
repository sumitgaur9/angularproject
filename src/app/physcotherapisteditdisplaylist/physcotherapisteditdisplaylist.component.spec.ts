import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyscotherapisteditdisplaylistComponent } from './physcotherapisteditdisplaylist.component';

describe('PhyscotherapisteditdisplaylistComponent', () => {
  let component: PhyscotherapisteditdisplaylistComponent;
  let fixture: ComponentFixture<PhyscotherapisteditdisplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhyscotherapisteditdisplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyscotherapisteditdisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
