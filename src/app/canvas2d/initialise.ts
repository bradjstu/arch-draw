export function initbuffer(context: WebGLRenderingContext) {

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

    return {
      position: positionBuffer,
    };
}
