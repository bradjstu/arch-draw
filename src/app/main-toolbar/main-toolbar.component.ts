import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainToolbarService } from './main-toolbar.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  @Output() buttonChange = new EventEmitter();

  constructor(private service: MainToolbarService) { }

  ngOnInit(): void {
  }

  onButtonChange(value) {
    this.service.toggleButtons(value);
  }
}

