import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingUIService {
  constructor() { }

  // Observable source
  private backGroundSource = new Subject<string>();
  private headBarSource = new Subject<string>();

  // Observerble streams
  backGround$ = this.backGroundSource.asObservable();
  headBar$ = this.headBarSource.asObservable();

  // Observerble commands
  changeBackGround(bg : string){
    this.backGroundSource.next(bg);
  }

  changeHeadBar(hb : string){
    this.headBarSource.next(hb);
  }

}
