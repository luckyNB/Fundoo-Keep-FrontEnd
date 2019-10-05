import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelofnoteComponent } from './labelofnote.component';

describe('LabelofnoteComponent', () => {
  let component: LabelofnoteComponent;
  let fixture: ComponentFixture<LabelofnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelofnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelofnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
