import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordsetupComponent } from './passwordsetup.component';

describe('PasswordsetupComponent', () => {
  let component: PasswordsetupComponent;
  let fixture: ComponentFixture<PasswordsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
