import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-window-layout',
  templateUrl: './window-layout.component.html',
  styleUrls: ['./window-layout.component.css']
})
export class WindowLayoutComponent implements AfterViewInit {
  animation : boolean = false

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.onAnimationComponent()
    },0)
  }

  onAnimationComponent(){
    this.animation = true
  }
}
