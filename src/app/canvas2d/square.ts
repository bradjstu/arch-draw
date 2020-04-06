import { DisplayObject2d } from './displayObject2d';
import { vec4, vec3 } from 'gl-matrix';

export class Square extends DisplayObject2d {

  constructor(color: vec4, translation: vec3, zAxisRotation: number, scale: vec3) {
    super(color, translation, zAxisRotation, scale);
  }
}

export function randomSquare() {
  return new Square(
    vec4.fromValues(Math.random(), Math.random(), Math.random(), 1),
    vec3.fromValues(Math.random(), Math.random(), 0),
    Math.random() * Math.PI / 2,
    vec3.fromValues(Math.random() * 2, Math.random() * 2, 0));
}
