import { mat4, vec2, vec4 } from 'gl-matrix';

export function clipSpaceToWorldSpaceTranformation(inverseViewProjectionMatrix: mat4,
                                                   zDepth: number,
                                                   clipSpaceCoordinates: vec2) {

  // Need Z-Depth for calculation, in 3D you would often use picking
  // However for 2D we can calculate the zDepth for everything from projection and view matrices
  const coordinateVector = vec4.fromValues(clipSpaceCoordinates[0], clipSpaceCoordinates[1], zDepth, 1);
  vec4.transformMat4(coordinateVector, coordinateVector, inverseViewProjectionMatrix);
  vec4.scale(coordinateVector, coordinateVector, 1 / coordinateVector[3]);
  return vec2.fromValues(coordinateVector[0], coordinateVector[1]);
}

export function worldSpaceToClipSpaceTransformation(viewProjectionMatrix: mat4,
                                                    worldSpaceCoordinates: vec2) {

  const coordinateVector = vec4.fromValues(worldSpaceCoordinates[0], worldSpaceCoordinates[1], 0, 1);

  // World Space ->(ViewMatrix) View Space ->(Projection Matrix) Clip Space
  // Remember order matters for matrices
  vec4.transformMat4(coordinateVector, coordinateVector, viewProjectionMatrix);

  // Scale by factor w
  vec4.scale(coordinateVector, coordinateVector, 1 / coordinateVector[3]);

  if (coordinateVector[3] === 0) {
    return vec2.fromValues(0, 0);
  }
  return vec2.fromValues(coordinateVector[0], coordinateVector[1]);
}

export function screenSpaceToClipSpaceTransformation(screenSpaceCoordinates: vec2, width: number, height: number) {

  const x = (screenSpaceCoordinates[0] / width * 2) - 1;
  const y = -(screenSpaceCoordinates[1] / height * 2) + 1;

  return vec2.fromValues(x, y);
}

export function clipSpaceToScreenSpaceTransformation(clipSpaceCoordinates: vec2, width: number, height: number) {

  const x = (clipSpaceCoordinates[0] + 1) * width / 2;
  const y = (1 - clipSpaceCoordinates[1]) * height / 2;

  return vec2.fromValues(x, y);
}
