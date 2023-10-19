import { Component } from '@angular/core';
import { statusSettingUI } from 'src/app/enums/statusSettingUI.enum';
import { SettingUIService } from 'src/app/services/settingUI/setting-ui.service';

@Component({
  selector: 'app-setting-ui',
  templateUrl: './setting-ui.component.html',
  styleUrls: ['./setting-ui.component.css']
})
export class SettingUIComponent {

  constructor(private settingUI : SettingUIService){}

  backgroudsActive : number = 0
  headbarsActive : number = 0

  backgrouds = [
    { label:'BackGround light', value:statusSettingUI.light, index:0 },
    { label:'BackGround dark', value:statusSettingUI.dark, index:1 },
  ];
  headbars = [
    {label:'HeadBar light',value:statusSettingUI.light, index:0},
    {label:'HeadBar dark',value:statusSettingUI.dark, index:1},
  ];

  onChangeBackGround(value : string, index : number){
    this.settingUI.changeBackGround(value);
    this.activeBackground(index)
  }

  onChangeHeadBar(value : string, index: number){
    this.settingUI.changeHeadBar(value)
    this.activeHeadbars(index)
  }

  activeBackground(position : number){
    this.backgroudsActive = position
  }
  
  activeHeadbars(position : number){
    this.headbarsActive = position
  }
}
