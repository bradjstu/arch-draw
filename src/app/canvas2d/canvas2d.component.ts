import { GeometryStore } from './geometryStore';
import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { MainToolbarService } from '../main-toolbar/main-toolbar.service';
import { calculateShaderProgramInfo } from './shaders';
import { initSquarebuffer } from './initialise';
import { redrawScene } from './renderCycle';
import { Square, randomSquare } from './square';
import { vec4, mat4, vec2 } from 'gl-matrix';
import { BottomBarService } from '../bottom-bar/bottom-bar.service';
import { worldToScreenTransformation, denormaliseScreenCoordinates, screenToWorldTranformation, normaliseScreenCoordinates } from './coordinateTransform';
import { calculateModelViewMatrix, calculateProjectionMatrix } from './camera';


@Component({
  selector: 'app-canvas2d',
  templateUrl: './canvas2d.component.html',
  styleUrls: ['./canvas2d.component.css']
})

export class Canvas2dComponent implements AfterViewInit {

  @ViewChild('glCanvasRef', {read: ElementRef, static: false})
  private glCanvasRef: ElementRef;
  private glCanvas: HTMLCanvasElement;
  private context: WebGLRenderingContext;

  private programInfo;
  private geometryStore: GeometryStore;
  private projectionMatrix: mat4;
  private modelViewMatrix: mat4;

  constructor(private mainToolbarService: MainToolbarService,
              private bottomBarService: BottomBarService) {}

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

    this.programInfo = calculateShaderProgramInfo(this.context);
    initSquarebuffer(this.context, this.programInfo);

    // For now we aren't going to consider a situation where these change
    // Most likely they will be the same for all things in view
    // Potentially changing when starting to introduce camera controls
    this.projectionMatrix = calculateProjectionMatrix(this.context);
    this.modelViewMatrix = calculateModelViewMatrix(this.context);

    const initialsquares: Array<Square> = [
      {color: vec4.fromValues(1, 0, 0, 1), translation: vec4.fromValues(0, 0, 0, 0)},
      {color: vec4.fromValues(0, 1, 0, 1), translation: vec4.fromValues(1, 0, 0, 0)}
    ];

    this.geometryStore = new GeometryStore(initialsquares);

    redrawScene(this.context, this.programInfo, this.projectionMatrix, this.modelViewMatrix,
                this.geometryStore.getSquares());
  }

  // Clicks in the webGL canvas
  @HostListener('click', ['$event'])
  onClick(event: any) {
    this.geometryStore.getSquares().push(randomSquare());
    redrawScene(this.context, this.programInfo, this.projectionMatrix, this.modelViewMatrix,
                this.geometryStore.getSquares());

         //console.log(worldToScreenTransformation(this.projectionMatrix, this.modelViewMatrix, vec2.fromValues(event.offsetX, event.offsetY)));

    const blah = normaliseScreenCoordinates(vec2.fromValues(220, 146), this.glCanvas.width, this.glCanvas.height);
    console.log(blah);
    console.log(screenToWorldTranformation(this.projectionMatrix, this.modelViewMatrix, blah));

    console.log(worldToScreenTransformation
      (this.projectionMatrix, this.modelViewMatrix, vec2.fromValues(-1, -1)));
    console.log(worldToScreenTransformation
      (this.projectionMatrix, this.modelViewMatrix, vec2.fromValues(-1, 1)));

    console.log(denormaliseScreenCoordinates(worldToScreenTransformation
      (this.projectionMatrix, this.modelViewMatrix, vec2.fromValues(-1, -1)),
       this.glCanvas.width, this.glCanvas.height));
    console.log(denormaliseScreenCoordinates(worldToScreenTransformation
      (this.projectionMatrix, this.modelViewMatrix, vec2.fromValues(-1, 1))
      , this.glCanvas.width, this.glCanvas.height));

  }

  // Clicks in the webGL canvas
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // event.client(X/Y) = pixels positon on screen with respect to window
    // event.screen(X/Y) = pixels positon on screen with respect to screen
    // event.offset(X/Y) = pixels positon on screen with respect to target element
    this.bottomBarService.mouseCoordinatesChange(event.offsetX, event.offsetY);
    }


  // Getting Data from other angular components
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
