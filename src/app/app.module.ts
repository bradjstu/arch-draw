import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Canvas2dComponent } from './canvas2d/canvas2d.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

import { MainToolbarService } from './main-toolbar/main-toolbar.service';
import { BottomBarService } from './bottom-bar/bottom-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    Canvas2dComponent,
    MainToolbarComponent,
    BottomBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MainToolbarService, BottomBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
