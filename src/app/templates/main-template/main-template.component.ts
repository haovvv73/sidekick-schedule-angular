import { Component,OnDestroy } from '@angular/core';
import { SettingUIService } from 'src/app/services/settingUI/setting-ui.service';
import { Subscription } from 'rxjs';
import { statusSettingUI } from 'src/app/enums/statusSettingUI.enum';

@Component({
  selector: 'app-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.css']
})
export class MainTemplateComponent implements OnDestroy {
  private settingUISubscription: Subscription | undefined;
  // default background light
  backgroundStyle : string = 'bg-laptop-background-light'

  constructor(private settingUI : SettingUIService){
    this.onListenerBackgroundChangeUI()
  }

  onListenerBackgroundChangeUI(){
    this.settingUISubscription = this.settingUI.backGround$.subscribe(
      next => {
        switch(next){
          case statusSettingUI.light:
            this.backgroundStyle = 'bg-laptop-background-light'
            break
          
          case statusSettingUI.dark:
            this.backgroundStyle = 'bg-laptop-background-dark'
            break

          default:
            this.backgroundStyle = 'bg-laptop-background-light'
        }
      }
    )
  }

  ngOnDestroy(): void {
    if(this.settingUISubscription){
      this.settingUISubscription.unsubscribe()
    }
  }
}
