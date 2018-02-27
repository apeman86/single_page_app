import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigPenComponent } from './pig-pen.component';

describe('PigPenComponent', () => {
  let component: PigPenComponent;
  let fixture: ComponentFixture<PigPenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigPenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
