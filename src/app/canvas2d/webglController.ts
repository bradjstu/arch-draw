import { GeometryStoreService } from './../geometry-store/geometry-store.service';
import { BottomBarService } from './../bottom-bar/bottom-bar.service';
import { vec4, vec3, vec2 } from 'gl-matrix';
import { calculateShaderProgramInfo } from './shaders';
import { initSquarebuffer } from './initialise';
import { Square, randomSquare } from '../shapes/square';
import { redrawScene } from './renderCycle';
import { Camera } from './camera';
import { clipSpaceToWorldSpaceTranformation } from './coordinateTransform';
import { Settings } from './settings';
import { Line } from '../shapes/line';

export class WebglController {

  constructor(private context: WebGLRenderingContext,
              private geomtryStoreService: GeometryStoreService) {}

  private programInfo;
  private camera: Camera;
  private settings: Settings;

  private drawingLine: boolean;
  private placeingLine: boolean;

  private squares: Square[] = [];
  private temporaryLine: Line;

  initialise() {

    this.geomtryStoreService.getSquaresObservable().subscribe(squares => this.squares = squares);
    this.geomtryStoreService.getTemporaryLineObservable().subscribe(temporaryLine => this.temporaryLine = temporaryLine);

    this.context.canvas.width  = (this.context.canvas as HTMLCanvasElement).offsetWidth;
    this.context.canvas.height = (this.context.canvas as HTMLCanvasElement).offsetHeight;

    this.settings = new Settings();

    // Set clear color to black, fully opaque
    this.context.clearColor(0.0, 0.0, 0.0, 0.1);
    // Clear the color buffer with specified clear color
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    this.programInfo = calculateShaderProgramInfo(this.context);
    initSquarebuffer(this.context, this.programInfo);

    const initialsquares: Array<Square> = [
      new Square(vec4.fromValues(1, 0, 0, 1), vec3.fromValues(0, 0, 0), 0, vec3.fromValues(1, 1, 1)),
      new Square(vec4.fromValues(1, 0, 0, 1), vec3.fromValues(1, 1, 0), 0, vec3.fromValues(1, 1, 1))
    ];

    this.camera = new Camera(this.context.canvas.width, this.context.canvas.height);

    this.invalidate();
  }

  invalidate() {
    redrawScene(this.context, this.programInfo, this.camera.getProjectionMatrix(),
                this.camera.getViewMatrix(), this.squares, this.temporaryLine);
  }

  onMouseClick(clipSpaceCoordinates: vec2) {
    if (this.drawingLine) {

      const worldSpaceCoordinates = clipSpaceToWorldSpaceTranformation(
        this.camera.getInverseViewProjectMatrix(),
        this.camera.getZDepth(),
        clipSpaceCoordinates);

      if (this.placeingLine) {
        this.placeLine();
        this.placePoint(worldSpaceCoordinates);
      } else {
        this.placePoint(worldSpaceCoordinates);
        this.placeingLine = true;
      }
    } else {
      this.geomtryStoreService.addSquare(randomSquare());
    }

    this.invalidate();
  }

  onMouseMove(clipSpaceCoordinates: vec2, bottomBarService: BottomBarService) {
    const worldSpaceCoordinates = clipSpaceToWorldSpaceTranformation(
      this.camera.getInverseViewProjectMatrix(),
      this.camera.getZDepth(),
      clipSpaceCoordinates);

    bottomBarService.mouseCoordinatesChange(worldSpaceCoordinates[0], worldSpaceCoordinates[1]);

    if (this.placeingLine) {
      this.updateLine(worldSpaceCoordinates);
      this.invalidate();
    }
  }

  setDrawingLine(drawingLine: boolean) {
    this.drawingLine = drawingLine;
  }

  updateLine(worldSpaceCoordinates: vec2) {
    this.temporaryLine.updateEndPoint(worldSpaceCoordinates);
    this.geomtryStoreService.setTemporaryLine(this.temporaryLine);
  }

  cancelLine() {
    this.placeingLine = false;
    this.geomtryStoreService.clearTemporaryLine();
    this.invalidate();
  }

  placeLine() {
    this.geomtryStoreService.addSquare(this.temporaryLine);
    this.geomtryStoreService.clearTemporaryLine();
  }

  placePoint(worldSpaceCoordinates: vec2) {
    this.geomtryStoreService.setTemporaryLine(new Line(worldSpaceCoordinates, worldSpaceCoordinates, 3));
  }

  fitToContainer() {
    this.context.canvas.width  = (this.context.canvas as HTMLCanvasElement).offsetWidth;
    this.context.canvas.height = (this.context.canvas as HTMLCanvasElement).offsetHeight;

    this.camera.updateCameraAspect(this.context.canvas.width, this.context.canvas.height);
    this.invalidate();
  }
}
