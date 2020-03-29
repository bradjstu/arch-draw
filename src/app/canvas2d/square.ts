import { vec4 } from 'gl-matrix';

export interface Square {
  color: vec4;
  translation: vec4;
}

export function randomSquare() {
  return {color: vec4.fromValues(Math.random(), Math.random(), Math.random(), 1),
     translation: vec4.fromValues(Math.random(), Math.random(), 0, 0)};
}
