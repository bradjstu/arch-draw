import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { MainToolbarService } from '../main-toolbar/main-toolbar.service';
import { BottomBarService } from '../bottom-bar/bottom-bar.service';
import { WebglController } from './webglController';
import { vec2 } from 'gl-matrix';
import { screenSpaceToClipSpaceTransformation } from './coordinateTransform';

@Component({
  selector: 'app-canvas2d',
  templateUrl: './canvas2d.component.html',
  styleUrls: ['./canvas2d.component.css']
})

export class Canvas2dComponent implements AfterViewInit {

  @ViewChild('glCanvasRef', {read: ElementRef, static: false})
  private glCanvasRef: ElementRef;
  private glCanvas: HTMLCanvasElement;
  private webglController: WebglController;

  constructor(private mainToolbarService: MainToolbarService,
              private bottomBarService: BottomBarService) {}

  ngAfterViewInit(): void {
    this.glCanvas = this.glCanvasRef.nativeElement as HTMLCanvasElement;

    const context = this.glCanvas.getContext('webgl');

    // Only continue if WebGL is available and working
    if (context === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }

    this.webglController = new WebglController(context);
    this.webglController.initialise();

    this.initaliseSubscribers();
  }

  // Clicks in the webGL canvas
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.webglController.onMouseClick();
  }

  // MouseMovement in the webGL canvas
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const clipSpaceCoordinates = screenSpaceToClipSpaceTransformation(
      vec2.fromValues(event.offsetX, event.offsetY), this.glCanvas.width, this.glCanvas.height);

    this.webglController.onMouseMove(clipSpaceCoordinates, this.bottomBarService);
  }

  // Getting Data from other angular components
  private initaliseSubscribers() {
    this.mainToolbarService.change.subscribe( value => {
        if (value) {
          this.glCanvas.style.cursor = 'crosshair';
        } else {
          this.glCanvas.style.cursor = 'default';
        }
      });
  }
}
