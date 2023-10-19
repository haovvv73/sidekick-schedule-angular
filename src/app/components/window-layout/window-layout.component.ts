import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-window-layout',
  templateUrl: './window-layout.component.html',
  styleUrls: ['./window-layout.component.css']
})
export class WindowLayoutComponent implements AfterViewInit {
  animation : boolean = false

  ngAfterViewInit(): void {
    this.onAnimationComponent()
  }

  onAnimationComponent(){
    this.animation = true
  }
}
