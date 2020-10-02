import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavewebsitetextdataComponent } from './savewebsitetextdata.component';

describe('SavewebsitetextdataComponent', () => {
  let component: SavewebsitetextdataComponent;
  let fixture: ComponentFixture<SavewebsitetextdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavewebsitetextdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavewebsitetextdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
