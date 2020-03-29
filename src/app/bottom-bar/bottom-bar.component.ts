import { BottomBarService } from './bottom-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {

  public x = '';
  public y = '';

  constructor(private service: BottomBarService) { }

  ngOnInit(): void {
    this.intialiseSubscriber();
  }

  // Getting Data from other angular components
  intialiseSubscriber() {
    this.service.change.subscribe( value => {
        this.x = value.x;
        this.y = value.y;
      });
  }
}
