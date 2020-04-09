import { vec4, vec3, mat4, quat } from 'gl-matrix';

export class DisplayObject2d {
  private color: vec4;
  private translation: vec3;
  private scale: vec3;

  private rotationQuaternion: quat;
  private modelMatrix: mat4;

  constructor(sColor: vec4, sTranslation: vec3, sZAxisRotation: number, sScale: vec3) {
    this.color = sColor;
    this.translation = sTranslation;
    this.scale = sScale;

    this.rotationQuaternion = quat.create();
    quat.identity(this.rotationQuaternion);
    quat.rotateZ(this.rotationQuaternion, this.rotationQuaternion, sZAxisRotation);

    this.modelMatrix = mat4.create();
    this.calculateModelMatrix();
  }

  private calculateRotationQuaternion(zAxisRotation: number) {

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

  protected setRotation(zAxisRotation: number) {
    quat.identity(this.rotationQuaternion);
    quat.rotateZ(this.rotationQuaternion, this.rotationQuaternion, zAxisRotation);
    this.calculateModelMatrix();
  }

  protected setScale(scale: vec3) {
    this.scale = scale;
    this.calculateModelMatrix();
  }

  protected setTranslation(translation: vec3) {
    this.translation = translation;
  }
}
