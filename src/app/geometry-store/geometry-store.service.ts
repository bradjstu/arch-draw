import { vec2 } from 'gl-matrix';
import { Injectable } from '@angular/core';
import { Square } from '../shapes/square';
import { Line } from '../shapes/line';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeometryStoreService {
  private squares: Square[] = [];
  private temporaryLineSubject = new Subject<Line>();

  constructor() { }

  getSquaresObservable(): Observable<Square[]> {
    return of(this.squares);
  }

  getTemporaryLineObservable(): Observable<Line> {
    return this.temporaryLineSubject;
  }

  addSquare(square: Square): void {
    this.squares.push(square);
  }

  setTemporaryLine(line: Line): void {
    this.temporaryLineSubject.next(line);
  }

  clearTemporaryLine(): void {
    this.temporaryLineSubject.next(null);
  }
}
