export function initSquarebuffer(context: WebGLRenderingContext, programInfo) {

    // Create a buffer for the square's positions.

    const positionBuffer = context.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.

    const positions = [
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    context.bufferData(context.ARRAY_BUFFER,
                  new Float32Array(positions),
                  context.STATIC_DRAW);

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;  // pull out 2 values per iteration
      const type = context.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
                              // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from

      context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

      context.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);

      context.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
}
