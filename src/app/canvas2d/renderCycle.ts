import { mat4, vec4 } from 'gl-matrix';
import { calculateProjectionMatrix, calculateModelViewMatrix } from './camera';

export function drawScene(gl: WebGLRenderingContext, programInfo) {

  clearScene(gl);

  // For now we aren't going to consider a situation where these change
  // Most likely they will be the same for all things in view
  // Potentially changing when starting to introduce camera controls
  const projectionMatrix = calculateProjectionMatrix(gl);
  const modelViewMatrix = calculateModelViewMatrix(gl);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  let squares: Array<vec4> = [vec4.fromValues(1, 0, 0, 1), vec4.fromValues(0, 1, 0, 1)];
  squares.forEach(elementColor => {
    drawSquare(gl, programInfo, projectionMatrix, modelViewMatrix, elementColor);
  });
}

function drawSquare(gl: WebGLRenderingContext, programInfo, projectionMatrix, modelViewMatrix,
                    color: vec4) {

  // Set the shader uniforms
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  gl.uniform4fv(programInfo.uniformLocations.fragColor, color);

  const offset = 0;
  const vertexCount = 4;
  gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
}

function clearScene(gl) {
  // Clear the canvas before we start drawing on it.
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // tslint:disable-next-line: no-bitwise
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}


