import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherlinksComponent } from './otherlinks.component';

describe('OtherlinksComponent', () => {
  let component: OtherlinksComponent;
  let fixture: ComponentFixture<OtherlinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherlinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
