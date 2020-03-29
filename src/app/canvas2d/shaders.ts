export function calculateShaderProgramInfo(context: WebGLRenderingContext) {
  const shaderProgram = initShaderProgram(context);
  return getProgramInfo(context, shaderProgram);
}

// Vertex shader program

const vsSource = `
attribute vec4 aVertexPosition;

uniform vec4 uTranslationVector;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * (aVertexPosition + uTranslationVector);
}
`;

const fsSource = `
    precision mediump float;
    uniform vec4 uFragColor;

    void main() {
      gl_FragColor = uFragColor;
    }
  `;

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(context: WebGLRenderingContext) {
  const vertexShader = loadShader(context, context.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(context, context.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = context.createProgram();
  context.attachShader(shaderProgram, vertexShader);
  context.attachShader(shaderProgram, fragmentShader);
  context.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + context.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function getProgramInfo(gl, shaderProgram) {
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      translationVector: gl.getUniformLocation(shaderProgram, 'uTranslationVector'),
      fragColor: gl.getUniformLocation(shaderProgram, 'uFragColor')
    },
  };
}
