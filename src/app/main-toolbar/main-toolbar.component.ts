import { Component, OnInit } from '@angular/core';
import { MainToolbarService } from './main-toolbar.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  constructor(private service: MainToolbarService) { }

  ngOnInit(): void {
  }

  onButton1CLick() {
    this.service.toggleButton1Clicked();
  }

}
