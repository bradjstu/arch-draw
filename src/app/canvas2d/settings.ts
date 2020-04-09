import { vec4 } from 'gl-matrix';
export class Settings {
  public lineWidth: number;
  public lineColour: vec4;

  constructor() {
    this.lineWidth = 3;
    this.lineColour = vec4.fromValues(0, 1, 0, 1);
  }
}
