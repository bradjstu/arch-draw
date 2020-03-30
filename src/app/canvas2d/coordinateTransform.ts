import { mat4, vec2, vec4 } from 'gl-matrix';

export function screenToWorldTranformation(projectionMatrix: mat4,
                                           viewModelMatrix: mat4,
                                           screenCoordinates: vec2) {

  const vmpMatrix = mat4.create();
  mat4.multiply(vmpMatrix, projectionMatrix, viewModelMatrix);
  const vmpInvMatrix = mat4.create();
  mat4.invert(vmpInvMatrix, vmpMatrix);
  const sc4 = vec4.fromValues(screenCoordinates[0], screenCoordinates[1], -6, 1);
  const wc4 = vec4.create();
  vec4.transformMat4(wc4, sc4, vmpInvMatrix);
  return vec2.fromValues(wc4[0], wc4[1]);
}

export function worldToScreenTransformation(projectionMatrix: mat4,
                                            viewModelMatrix: mat4,
                                            worldCoordinates: vec2) {
  const wc4 = vec4.fromValues(worldCoordinates[0], worldCoordinates[1], 0, 1);
  const vmpMatrix = mat4.create();
  //mat4.multiply(vmpMatrix, projectionMatrix, viewModelMatrix);
  mat4.multiply(vmpMatrix, viewModelMatrix, projectionMatrix);
  const sc4 = vec4.create();
  vec4.transformMat4(sc4, wc4, vmpMatrix);
  return vec2.fromValues(sc4[0], sc4[1]);
}

export function normaliseScreenCoordinates(screenCoordinates: vec2, width, height) {

  const x = (screenCoordinates[0] / width * 2) - 1;
  const y = -(screenCoordinates[1] / height * 2) + 1;

  return vec2.fromValues(x, y);
}

export function denormaliseScreenCoordinates(normalisedScreenCoordinates: vec2, width, height) {

  const x = (normalisedScreenCoordinates[0] + 1) * width / 2;
  const y = (1 - normalisedScreenCoordinates[1]) * height / 2;

  return vec2.fromValues(x, y);
}
