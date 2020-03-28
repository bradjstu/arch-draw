import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { changeColour } from './changeColour';

@Component({
  selector: 'app-canvas2d',
  templateUrl: './canvas2d.component.html',
  styleUrls: ['./canvas2d.component.css']
})

export class Canvas2dComponent implements AfterViewInit {

  @ViewChild('glCanvas', {read: ElementRef, static: false})
  public glCanvas: ElementRef;
  public context: WebGLRenderingContext;

  ngAfterViewInit(): void {
    this.context = (this.glCanvas.nativeElement as HTMLCanvasElement).getContext('webgl');

    // Only continue if WebGL is available and working
    if (this.context === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }

    // Set clear color to black, fully opaque
    this.context.clearColor(0.0, 0.0, 0.0, 0.1);
    // Clear the color buffer with specified clear color
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    setTimeout(() => {  changeColour(this.context); }, 4000);
  }
}
