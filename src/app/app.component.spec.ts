import { BottomBarService } from './bottom-bar/bottom-bar.service';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { Canvas2dComponent } from './canvas2d/canvas2d.component';
import { MainToolbarService } from './main-toolbar/main-toolbar.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        Canvas2dComponent,
        MainToolbarComponent,
        BottomBarComponent
      ],
      providers: [
        MainToolbarService,
        BottomBarService
      ],
      imports: [
        MatButtonToggleModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'stu-arc'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('stu-arc');
  });
});
