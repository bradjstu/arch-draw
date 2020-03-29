import { Square } from './square';
export class GeometryStore {
  private squares: Square[] = [];

  constructor(private initialValues : Square[]) {
    this.squares = initialValues;
  }

  getSquares() {
    return this.squares;
  }

}
