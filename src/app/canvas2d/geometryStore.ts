import { Square } from './square';
import { Line } from './line';

export class GeometryStore {
  private squares: Square[] = [];
  private temporaryLine: Line;

  constructor(private initialValues: Square[]) {
    this.squares = initialValues;
  }

  getSquares() {
    return this.squares;
  }

  addSquare(square: Square) {
    this.squares.push(square);
  }

  setTemporaryLine(line: Line) {
    this.temporaryLine = line;
  }

  getTemporaryLine() {
    return this.temporaryLine;
  }

  clearTemporaryLine() {
    this.temporaryLine = null;
  }
}
