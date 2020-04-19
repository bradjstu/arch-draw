import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToolbarComponent } from './main-toolbar.component';
import { MainToolbarService } from './main-toolbar.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

describe('MainToolbarComponent', () => {
  let component: MainToolbarComponent;
  let fixture: ComponentFixture<MainToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainToolbarComponent ],
      providers: [ MainToolbarService ],
      imports: [
        MatButtonToggleModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
