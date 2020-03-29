import { EventEmitter } from '@angular/core';

export class BottomBarService {

  public change: EventEmitter<any> = new EventEmitter();

  mouseCoordinatesChange(x, y) {
    this.change.emit({x, y});
  }
}
