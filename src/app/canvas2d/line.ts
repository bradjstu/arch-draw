import { vec4, vec3, vec2 } from 'gl-matrix';
import { Square } from './square';

export class Line extends Square {

  private startPoint: vec2;
  private endPoint: vec2;

  constructor(startPoint: vec2, endPoint: vec2, width: number) {
    super(
      vec4.fromValues(1, 1, 1, 1),
      vec3.fromValues(startPoint[0], startPoint[1], 0),
      lineRotation(startPoint, endPoint),
      vec3.fromValues(lineLength(startPoint, endPoint), 0.01, 1)
    );

    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  updateEndPoint(endPoint: vec2) {
    this.endPoint = endPoint;
    const rotation = lineRotation(this.startPoint, this.endPoint);
    this.setRotation(lineRotation(this.startPoint, this.endPoint));
    const length = lineLength(this.startPoint, this.endPoint);
    this.setScale(vec3.fromValues(lineLength(this.startPoint, this.endPoint), 0.01, 1));
    this.setTranslation(
      vec3.fromValues(this.startPoint[0] + lineLength(this.startPoint, this.endPoint) * Math.cos(rotation),
      this.startPoint[1] + lineLength(this.startPoint, this.endPoint) * Math.sin(rotation) , 0));
  }

}

function lineLength(startPoint: vec2, endPoint: vec2) {
  return (1 / 2) * Math.sqrt(
    Math.pow(startPoint[0] - endPoint[0], 2) +
    Math.pow(startPoint[1] - endPoint[1], 2));
}

function lineRotation(startPoint: vec2, endPoint: vec2) {
  return Math.atan2(endPoint[1] - startPoint[1], endPoint[0] - startPoint[0]);
}

export function drawLine() {

}
