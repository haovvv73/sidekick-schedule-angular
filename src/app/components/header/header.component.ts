import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewTableComponent } from '../view-table/view-table.component';
import { Subscription, interval } from 'rxjs';
import { SettingUIService } from 'src/app/services/settingUI/setting-ui.service';
import { statusSettingUI } from 'src/app/enums/statusSettingUI.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {
  private timerSubscription: Subscription | undefined;
  date = ''
  time = ''
  settingUISubscription: Subscription | undefined;
  // default headbar light
  headbarStyle: string = 'bg-white/40';

  constructor(
    public dialog: MatDialog,
    private settingUI: SettingUIService
  ) {
    this.onListenerHeadbarChangeUI()
  }

  ngOnInit(): void {
    this.displayTimeAndDate()
    this.timerSubscription = interval(1000).subscribe(() => {
      this.displayTimeAndDate()
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe()
    }

    if (this.settingUISubscription) {
      this.settingUISubscription.unsubscribe()
    }
  }

  onListenerHeadbarChangeUI():void {
    this.settingUISubscription = this.settingUI.headBar$.subscribe(
      next => {
        switch (next) {
          case statusSettingUI.light:
            this.headbarStyle = 'bg-white/40';
            break;

          case statusSettingUI.dark:
            this.headbarStyle = 'bg-black/40';
            break;

          default:
            this.headbarStyle = 'bg-white/40';
        }
      }
    )
  }

  onOpenAboutDialog():void {
    this.dialog.open(ViewTableComponent)
  }

  displayTimeAndDate():void {
    const currentDate = new Date();

    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDate.getDay()];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][currentDate.getMonth()];
    const day = currentDate.getDate();

    this.date = `${weekday} ${month} ${day}`;
    this.time = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
}
