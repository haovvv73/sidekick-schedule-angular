import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';

interface Event {
  id: string,
  title: string,
  start: string,
  end: string,
  description: string,
  display: string,
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  // property
  currentID: string = ''
  currentDate: string = ''
  buttonUpdateIsDisabled: boolean = true
  createEventForm: boolean = false
  eventCalender: any = {}
  events: Event[] = [
    {
      id: '1',
      title: 'hang out',
      start: '2023-12-22',
      end: '2023-12-24',
      description: 'movie theater at vincom',
      display: 'default'
    },
    {
      id: '2',
      title: 'study',
      start: '2023-12-27',
      end: '2023-12-29',
      description: 'study at vincom',
      display: 'default'
    },
  ]

  // form object
  eventGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  eventDetailGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  constructor() {
    this.initEvent()
  }

  calendarOptions: CalendarOptions = {
    // attribute
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true, // Enable event editing
    droppable: true, // Enable event dragging and dropping
    selectable: true, // Enable select event
    dayMaxEventRows: true, // for all non-TimeGrid views
    views: {
      timeGrid: {
        dayMaxEventRows: 6 // adjust to 6 only for timeGridWeek/timeGridDay
      }
    },
    //
    events: [],
    // action
    eventClick: this.onEventClick.bind(this),
    eventDrop: this.onEventDrop.bind(this),
    select: this.onDateSelect.bind(this)
  };

  // binding view
  readDetailEvent(title: string, description: string, currentDate: string) {
    this.eventDetailGroup.get('title')?.setValue(title)
    this.eventDetailGroup.get('description')?.setValue(description)
    this.currentDate = currentDate
    this.currentID = this.eventCalender.id
    this.disabledButtonUpdate()
  }

  trackByFn(index : any, event : Event) {
    return event.end;
  }

  // diff date
  caclDiffDate(dateStr1: string, dateStr2: string): number {
    const date1 = moment(dateStr1);
    const date2 = moment(dateStr2);

    return date2.diff(date1, 'days');
  }

  // is after date
  isAfterDate(dateStr1: string): boolean {
    const date1 = moment().format('yyyy-MM-DD');
    const date2 = moment(dateStr1);
    return date2.isAfter(date1, 'days');
  }

  // button update trigger
  disabledButtonUpdate() {
    this.buttonUpdateIsDisabled = true
  }

  unDisabledButtonUpdate() {
    this.buttonUpdateIsDisabled = false
  }

  // temp funtion !!!--------- ! ---------!!!
  randomId() {
    const currentEvent = this.events[this.events.length-1]
    if(currentEvent) return parseInt(currentEvent.id) + 1
    return 1
  }

  // form create event
  onShowCreateEventFormClick() {
    this.createEventForm = true
  }

  onHideCreateEventFormClick() {
    this.createEventForm = false
    this.resetCreateEventForm()
  }

  resetCreateEventForm() {
    this.eventGroup.reset()
  }

  // method event -----------------------
  initEvent() {
    setTimeout(() => {
      this.calendarOptions.events = this.events
    }, 700)
  }

  onEventClick(arg: EventClickArg) {
    const { extendedProps, startStr, title } = arg.event
    // binding
    this.eventCalender = arg.event
    this.readDetailEvent(title, extendedProps['description'], startStr)
    
  }

  onEventDrop(arg: EventDropArg) {
    let { id, extendedProps, startStr, endStr, title, display } = arg.event

    const newEvent: Event = {
      id,
      title,
      description: extendedProps['description'],
      start: startStr,
      end: endStr,
      display
    }

    // binding
    this.eventCalender = arg.event
    this.updateEventTime(newEvent)
    // update view form
    if (this.currentID === id) {
      this.currentDate = startStr
    }
  }

  onDateSelect(arg: DateSelectArg) {
    // open form
    this.onShowCreateEventFormClick()
    this.eventCalender = arg
  }

  // crud button - handle event button
  // CREATE
  onCreateEventClick() {
    if (!this.eventGroup.invalid) {
      // prepare data
      const id = this.randomId().toString()
      const title = this.eventGroup.value.title
      const description = this.eventGroup.value.description
      const start = this.eventCalender.startStr;
      const end = this.eventCalender.endStr;
      const display = this.caclDiffDate(start, end) > 1 ? 'default' : 'list-item'

      const newEvent: Event = {
        id,
        title,
        description,
        start,
        end,
        display
      }

      this.createEvent(newEvent)
      // update form view
      this.onHideCreateEventFormClick()
      this.readDetailEvent(title, description, start)
    }
  }
  // UPDATE
  onUpdateEventClick() {
    if (!this.eventDetailGroup.invalid && !this.buttonUpdateIsDisabled) {
      // prepare data
      const id = this.eventCalender.id
      const title = this.eventDetailGroup.value.title
      const description = this.eventDetailGroup.value.description
      const start = this.eventCalender.startStr;
      const end = this.eventCalender.endStr;
      const display = this.eventCalender.display

      const newEvent: Event = {
        id,
        title,
        description,
        start,
        end,
        display
      }

      this.updateEventTitleAndDescription(newEvent)
      // update form view
      this.disabledButtonUpdate()
    }
  }
  // READ
  onReadEventClick(id: string) {
    const calendarApi = this.calendarComponent.getApi();
    this.eventCalender = calendarApi.getEventById(id);
    let { extendedProps, startStr, title } = this.eventCalender
    this.readDetailEvent(title, extendedProps['description'], startStr)
  }
  // DELETE
  onDeleteEventClick(id: string) {
    const calendarApi = this.calendarComponent.getApi();
    this.eventCalender = calendarApi.getEventById(id);
    this.deleteEvent(id)
    // update form view
    if (this.currentID === id) {
      this.eventDetailGroup.reset()
      this.currentDate = ''
    }
  }

  // crud action - handle data (local and db) and view calender
  // UPDATE
  updateEventTitleAndDescription(newEvent: Event) {
    const itemFinded = this.events.find(item => item.id == newEvent.id)
    if (itemFinded) {
      // update source
      itemFinded.description = newEvent.description
      itemFinded.title = newEvent.title

      // update view calender
      this.eventCalender.setProp('title', newEvent.title)
      this.eventCalender.setExtendedProp('description', newEvent.description)
    }
  }

  updateEventTime(newEvent: Event) {
    const itemFinded = this.events.find(item => item.id == newEvent.id)
    if (itemFinded) {
      // update source
      itemFinded.start = newEvent.start
      itemFinded.end = newEvent.end
    }
  }
  // CREATE
  createEvent(newEvent: Event) {
    // update view calender
    this.eventCalender.view.calendar.addEvent(newEvent)
    this.eventCalender = this.eventCalender.view.calendar.getEventById(newEvent.id)

    // update source
    this.events.push(newEvent)
  }
  // DELETE
  deleteEvent(id: string) {
    // update view calender
    this.eventCalender.remove()

    // update source
    this.events = this.events.filter(item => item.id !== id)
  }

}
