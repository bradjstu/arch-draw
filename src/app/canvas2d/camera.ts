import { mat4, vec4 } from 'gl-matrix';

export class Camera {

  private projectionMatrix: mat4;
  private viewMatrix: mat4;
  private viewProjectionMatrix: mat4;
  private inverseViewProjectionMatrix: mat4;

  // This is a simplification we can make because of it being 2d
  private zDepth: number;

  constructor(canvasClientWidth: number, canvasClientHeight: number) {
    this.projectionMatrix = mat4.create();
    this.viewMatrix = mat4.create();

    this.calculateProjectionMatrix(canvasClientWidth, canvasClientHeight);
    this.calculateViewMatrix();

    this.viewProjectionMatrix = mat4.create();
    this.calculateViewProjectionMatrix();

    this.inverseViewProjectionMatrix = mat4.create();
    this.calculateInverseViewProjectionMatrix();

    this.calculateZDepth();
  }

  getProjectionMatrix() {
    return this.projectionMatrix;
  }

  getViewMatrix() {
    return this.viewMatrix;
  }

  getViewProjectionMatrix() {
    return this.viewProjectionMatrix;
  }

  getInverseViewProjectMatrix() {
    return this.inverseViewProjectionMatrix;
  }

  getZDepth() {
    return this.zDepth;
  }

  private recalculateDependants() {
    this.calculateViewProjectionMatrix();
    this.calculateInverseViewProjectionMatrix();
    this.calculateZDepth();
  }

  private calculateViewProjectionMatrix() {
    mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
  }

  private calculateInverseViewProjectionMatrix() {
    mat4.invert(this.inverseViewProjectionMatrix, this.viewProjectionMatrix);
  }

  private calculateProjectionMatrix(canvasClientWidth: number, canvasClientHeight: number) {
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = canvasClientWidth / canvasClientHeight;
    const zNear = 0.1;
    const zFar = 100.0;

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(this.projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
  }

  private calculateViewMatrix() {
    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(this.viewMatrix,     // destination matrix
                   this.viewMatrix,     // matrix to translate
                   [-0.0, 0.0, -6.0]);  // amount to translate
  }

  private calculateZDepth() {
    const testVector = vec4.fromValues(0, 0, 0, 1);

    vec4.transformMat4(testVector, testVector, this.viewProjectionMatrix);

    this.zDepth = testVector[2] / testVector[3];
  }

  updateCameraAspect(canvasClientWidth: number, canvasClientHeight: number) {
    this.calculateProjectionMatrix(canvasClientWidth, canvasClientHeight);
    this.recalculateDependants();
  }
}
