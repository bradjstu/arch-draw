import { EventEmitter } from '@angular/core';

export class MainToolbarService {

  private clicked = '';
  public change: EventEmitter<any> = new EventEmitter();


  toggleButtons(value) {
    this.clicked = value;
    this.change.emit(this.clicked);
  }

}
