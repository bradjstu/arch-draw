import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Canvas2dComponent } from './canvas2d/canvas2d.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { MainToolbarService } from './main-toolbar/main-toolbar.service';

@NgModule({
  declarations: [
    AppComponent,
    Canvas2dComponent,
    MainToolbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MainToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
