import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabsofnoteComponent } from './collabsofnote.component';

describe('CollabsofnoteComponent', () => {
  let component: CollabsofnoteComponent;
  let fixture: ComponentFixture<CollabsofnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollabsofnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabsofnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
