import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderofnoteComponent } from './reminderofnote.component';

describe('ReminderofnoteComponent', () => {
  let component: ReminderofnoteComponent;
  let fixture: ComponentFixture<ReminderofnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderofnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderofnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
