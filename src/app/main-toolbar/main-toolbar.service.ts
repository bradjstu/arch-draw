import { EventEmitter } from '@angular/core';

export class MainToolbarService {

  private clicked = false;
  public change: EventEmitter<any> = new EventEmitter();


  toggleButton1Clicked() {
    this.clicked = !this.clicked;
    this.change.emit(this.clicked);
    console.log('Hi');
  }

}
