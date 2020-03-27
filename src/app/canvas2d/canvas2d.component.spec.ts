import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Canvas2dComponent } from './canvas2d.component';

describe('Canvas2dComponent', () => {
  let component: Canvas2dComponent;
  let fixture: ComponentFixture<Canvas2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Canvas2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Canvas2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
