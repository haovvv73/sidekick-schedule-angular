import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-window-no-tab-layout',
  templateUrl: './window-no-tab-layout.component.html',
  styleUrls: ['./window-no-tab-layout.component.css']
})
export class WindowNoTabLayoutComponent implements AfterViewInit {
  animation : boolean = false

  ngAfterViewInit(): void {
    this.onAnimationComponent()
  }

  onAnimationComponent(){
    this.animation = true
  }
}
