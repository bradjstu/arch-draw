export function changeColour(context: WebGLRenderingContext) {
  context.clearColor(0.0, 0.0, 0.0, 1);
  context.clear(context.COLOR_BUFFER_BIT);
}
