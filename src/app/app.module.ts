import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Canvas2dComponent } from './canvas2d/canvas2d.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    Canvas2dComponent,
    MainToolbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
