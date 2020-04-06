import { BottomBarService } from './../bottom-bar/bottom-bar.service';
import { GeometryStore } from './geometryStore';
import { vec4, vec3, vec2 } from 'gl-matrix';
import { calculateShaderProgramInfo } from './shaders';
import { initSquarebuffer } from './initialise';
import { Square, randomSquare } from './square';
import { redrawScene } from './renderCycle';
import { Camera } from './camera';
import { clipSpaceToWorldSpaceTranformation } from './coordinateTransform';

export class WebglController {

  private programInfo;
  private geometryStore: GeometryStore;
  private camera: Camera;

  constructor(private context: WebGLRenderingContext) {}

  initialise() {
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

    this.geometryStore = new GeometryStore(initialsquares);

    this.camera = new Camera(this.context.canvas.width, this.context.canvas.height);

    this.invalidate();
  }

  invalidate() {
    redrawScene(this.context, this.programInfo, this.camera.getProjectionMatrix(),
                this.camera.getViewMatrix(), this.geometryStore.getSquares());
  }

  onMouseClick() {
    this.geometryStore.getSquares().push(randomSquare());
    this.invalidate();
  }

  onMouseMove(clipSpaceCoordinates: vec2, bottomBarService: BottomBarService) {
    const worldSpaceCoordinates = clipSpaceToWorldSpaceTranformation(
      this.camera.getInverseViewProjectMatrix(),
      this.camera.getZDepth(),
      clipSpaceCoordinates);

    bottomBarService.mouseCoordinatesChange(worldSpaceCoordinates[0], worldSpaceCoordinates[1]);
  }
}
