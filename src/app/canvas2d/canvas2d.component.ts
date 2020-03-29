import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { MainToolbarService } from '../main-toolbar/main-toolbar.service';
import { changeColour } from './changeColour';
import { onMouseDown } from './mouseDown';
import { calculateShaderProgramInfo } from './shaders';
import { initbuffer } from './initialise';
import { drawScene } from './renderCycle';


@Component({
  selector: 'app-canvas2d',
  templateUrl: './canvas2d.component.html',
  styleUrls: ['./canvas2d.component.css']
})

export class Canvas2dComponent implements AfterViewInit {

  @ViewChild('glCanvasRef', {read: ElementRef, static: false})
  public glCanvasRef: ElementRef;
  public glCanvas: HTMLCanvasElement;
  public context: WebGLRenderingContext;

  constructor(private mainToolbarService: MainToolbarService) {}

  ngAfterViewInit(): void {
    this.glCanvas = this.glCanvasRef.nativeElement as HTMLCanvasElement;
    this.context = this.glCanvas.getContext('webgl');

    // Only continue if WebGL is available and working
    if (this.context === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }

    // Set clear color to black, fully opaque
    this.context.clearColor(0.0, 0.0, 0.0, 0.1);
    // Clear the color buffer with specified clear color
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    // setTimeout(() => {  changeColour(this.context); }, 4000);

    this.getData();

    const programInfo = calculateShaderProgramInfo(this.context);
    const buffers = initbuffer(this.context);

    drawScene(this.context, programInfo, buffers);
  }

  @HostListener('onmousedown', ['$event'])
  onMouseDown(event: any) {
    onMouseDown(this.context, event as MouseEvent);
  }

  private getData() {
    this.mainToolbarService.change.subscribe( value => {
        if (value) {
          this.glCanvas.style.cursor = 'crosshair';
        } else {
          this.glCanvas.style.cursor = 'default';
        }
      });
  }
}
