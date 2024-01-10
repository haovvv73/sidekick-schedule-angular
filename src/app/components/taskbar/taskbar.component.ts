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
      label : 'schedule',
      img:'../../../assets/images/icons/lesson.png',
      link:'schedule'
    },
    {
      label : 'analyze',
      img:'../../../assets/images/icons/analyze.png',
      link:'analyze'
    },
    {
      label : 'groups',
      img:'../../../assets/images/icons/group.png',
      link:'contact'
    },
    {
      label : 'events',
      img:'../../../assets/images/icons/calendar.png',
      link:'events'
    },
  ]

  toolTipTaskBar = ''

  onToolTip(text : string){
    this.toolTipTaskBar = text
  }
}
