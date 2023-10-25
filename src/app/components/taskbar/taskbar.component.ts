import { Component } from '@angular/core';

interface itemTaskbar{
  label: string,
  img:string,
  link:string
}

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent {
  tasks : itemTaskbar[] = [
    {
      label : 'lesson schedule',
      img:'../../../assets/images/icons/lesson.png',
      link:'lessons'
    },
    {
      label : 'teacher list',
      img:'../../../assets/images/icons/analyze.png',
      link:'analyze'
    },
    {
      label : 'groups info',
      img:'../../../assets/images/icons/group.png',
      link:'groups'
    },
    {
      label : 'events schedule',
      img:'https://www.frontend.fyi/playground-assets/macos-dock/icons/calendar.png',
      link:'events'
    },
  ]

  toolTipTaskBar = ''

  onToolTip(text : string){
    this.toolTipTaskBar = text
  }
}
