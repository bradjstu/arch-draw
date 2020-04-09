import { mat4, vec4 } from 'gl-matrix';
import { Square } from './square';
import { Line } from './line';

export function redrawScene(gl: WebGLRenderingContext, programInfo,
                            projectionMatrix: mat4,
                            modelViewMatrix: mat4,
                            squares: Square[],
                            temporaryLine: Line) {

  clearScene(gl);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  squares.forEach(element => {
    drawSquare(gl, programInfo, projectionMatrix, modelViewMatrix,
      element.getModelMatrix(), element.getColor());
  });

  if (temporaryLine != null) {
    drawSquare(gl, programInfo, projectionMatrix, modelViewMatrix,
      temporaryLine.getModelMatrix(), temporaryLine.getColor());
  }
}

function drawSquare(gl: WebGLRenderingContext, programInfo,
                    projectionMatrix: mat4, viewMatrix: mat4,
                    modelMatrix: mat4, color: vec4) {

  // Set the shader uniforms
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.viewMatrix, false, viewMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelMatrix, false, modelMatrix);
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


