import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatienteditdisplaylistComponent } from './patienteditdisplaylist.component';

describe('PatienteditdisplaylistComponent', () => {
  let component: PatienteditdisplaylistComponent;
  let fixture: ComponentFixture<PatienteditdisplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatienteditdisplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatienteditdisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
