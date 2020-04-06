import { vec4, vec3, mat4, quat } from 'gl-matrix';

export class DisplayObject2d {
  private color: vec4;
  private translation: vec3;
  private zAxisRotation: number;
  private scale: vec3;

  private rotationQuaternion: quat;
  private modelMatrix: mat4;

  constructor(sColor: vec4, sTranslation: vec3, sZAxisRotation: number, sScale: vec3) {
    this.color = sColor;
    this.translation = sTranslation;
    this.zAxisRotation = sZAxisRotation;
    this.scale = sScale;

    this.rotationQuaternion = quat.create();
    quat.identity(this.rotationQuaternion);

    this.modelMatrix = mat4.create();

    this.calculateRotationQuaternion();
    this.calculateModelMatrix();
  }

  private calculateRotationQuaternion() {
    quat.rotateZ(this.rotationQuaternion, this.rotationQuaternion, this.zAxisRotation);
  }

  private calculateModelMatrix() {
    mat4.fromRotationTranslationScale(this.modelMatrix,
      this.rotationQuaternion,
      this.translation,
      this.scale);
  }

  public getColor() {
    return this.color;
  }

  public getModelMatrix() {
    return this.modelMatrix;
  }
}
