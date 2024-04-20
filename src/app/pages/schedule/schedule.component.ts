import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOneFieldComponent } from 'src/app/components/dialog-one-field/dialog-one-field.component';
import Course from 'src/app/models/schedule/course.mdoel';
import Schedule from 'src/app/models/schedule/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  // property
  schedules: Schedule[] = [
    {
      ID: 1,
      name: 'hcmus Schedule',
      courses: [
        {
          ID: 1,
          name: 'c program 2',
          day: 'monday',
          timeStart: '9h',
          timeEnd: '10h',
          address: 'Linh Trung',
          room: 'E304',
          description: ''
        },
        {
          ID: 2,
          name: 'c program 3',
          day: 'monday',
          timeStart: '9h',
          timeEnd: '10h',
          address: 'Linh Trung',
          room: 'E304',
          description: ''
        },
        {
          ID: 3,
          name: 'c program 1',
          day: 'tuesday',
          timeStart: '9h',
          timeEnd: '10h',
          address: 'Linh Trung',
          room: 'E304',
          description: ''
        }
      ]
    },
  ]
  weekString: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  IDschedule = 'IDschedule'

  // current data
  disabledNInpNameSchedule: boolean = true
  currentSchedule: Schedule | undefined;;
  coutColNum = 0
  coutColNumArr: number[] = []

  // form
  courseForm: boolean = false
  nameScheduleInput = new FormControl({ value: '', disabled: true })
  timeControl = new FormControl();
  courseGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/)]),
    day: new FormControl('', [Validators.required]),
    timeStart: new FormControl('', [Validators.required]),
    timeEnd: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    room: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })

  // IOC
  constructor(public dialog: MatDialog) {
    this.goBackSchedule()
  }

  // temp !!-------!-------!!
  randomId() {
    const n = this.schedules.length
    if (!n) return 1
    return this.schedules[n - 1].ID + 1
  }

  // ---------------- method until ----------------------
  countCol() {
    if (this.currentSchedule) {
      this.coutColNum = 0
      const dummy: any = {}
      this.currentSchedule.courses.forEach(item => {
        if (dummy[item.day]) {
          dummy[item.day] += 1
        } else {
          dummy[item.day] = 1
        }
        if (this.coutColNum < dummy[item.day]) this.coutColNum = dummy[item.day]
      })
      const test = Array(this.coutColNum).fill(0).map((_, index) => index + 1);
      return test
    }
    return []
  }

  claerCurrentSchedule() {
    this.currentSchedule = undefined
    this.nameScheduleInput.setValue('')
  }

  getValueCourseGroup() {
    const name = this.courseGroup.value.name
    const day = this.courseGroup.value.day
    const timeStart = this.courseGroup.value.timeStart
    const timeEnd = this.courseGroup.value.timeEnd
    const address = this.courseGroup.value.address
    const room = this.courseGroup.value.room
    const description = this.courseGroup.value.description
    // create id
    let ID = -1
    if (this.currentSchedule) {
      const n = this.currentSchedule.courses.length
      ID = n < 1 ? 1 : this.currentSchedule.courses[n - 1].ID + 1
    }
    // prepare data
    const newCourse: Course = {
      ID,
      name,
      day,
      timeStart,
      timeEnd,
      address,
      room,
      description,
    }
    return newCourse
  }
  //------------------ method event ---------------------
  // remind unsubscribe next implement api
  openDialog(callback: (s1: string) => void): void {
    const dialogRef = this.dialog.open(DialogOneFieldComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callback(result)
      }
    });
  }

  openEditNameScheduleClick() {
    this.disabledNInpNameSchedule = false
    this.nameScheduleInput.enable()
  }

  closeEditNameScheduleClick() {
    this.disabledNInpNameSchedule = true
    this.nameScheduleInput.disable()
    // set back current name schedule
    if (this.currentSchedule) this.nameScheduleInput.setValue(this.currentSchedule.name)
  }

  onOpenCourseFormClick() {
    this.courseForm = true
  }

  onCloseCourseFormClick() {
    this.courseForm = false
    this.courseGroup.reset()
  }

  goBackSchedule(){
    const ID = localStorage.getItem(this.IDschedule)
    if (ID){
      // find schedule
      const schedule = this.schedules.find(item => item.ID === parseInt(ID))
      // read schedule
      if(schedule){
        this.onReadScheduleClick(schedule)
      }else{
        localStorage.removeItem(this.IDschedule)
      }
    }
  }

  // SUBMIT new name schedule
  onSubmitNewNameSchedule() {
    if (this.currentSchedule && this.nameScheduleInput && this.nameScheduleInput.value) {
      // update current schedule   
      const tempSchedule = this.currentSchedule;
      tempSchedule.name = this.nameScheduleInput.value;
      // binding
      this.currentSchedule = tempSchedule;
      // update src schedule
      const scheduleFinded = this.schedules.find(item => item.ID === this.currentSchedule?.ID)
      // binding
      if (scheduleFinded) scheduleFinded.name = this.nameScheduleInput.value
    }

    this.closeEditNameScheduleClick()
  }

  // CREATE schedule
  onCreateScheduleClick() {
    this.openDialog((nameSchedule: string) => {
      // create schedule
      const ID = this.randomId()
      const newSchedule: Schedule = {
        ID,
        name: nameSchedule,
        courses: []
      }
      this.schedules.push(newSchedule)
    })
  }

  // DELETE schedule
  onDeleteScheduleClick(ID: number) {
    this.schedules = this.schedules.filter((item, index) => item.ID != ID)
    // delete schedule
    if (ID === this.currentSchedule?.ID) this.claerCurrentSchedule()
  }

  // READ schedule
  onReadScheduleClick(schedule: Schedule) {
    // read name-schedule
    this.nameScheduleInput.setValue(schedule.name)
    // read schedule
    this.currentSchedule = schedule
    // read cout col
    this.coutColNumArr = this.countCol()
    // save id in local store
    localStorage.setItem(this.IDschedule,schedule.ID.toString())
  }

  // DELETE course
  onDeleteCourseClick(IDSchedule: number, ID: number) {
    const tempSchedule = this.schedules.find(item => item.ID === IDSchedule)
    if (tempSchedule && this.currentSchedule) {
      // delete course
      tempSchedule.courses = tempSchedule.courses.filter(item => item.ID !== ID)
      // update view cout col
      this.coutColNumArr = this.countCol()

    }
  }

  // CREATE course
  onCreateCourseClick() {
    if (!this.courseGroup.invalid && this.currentSchedule) {
      const newCourse: Course = this.getValueCourseGroup()
      const tempSchedule = this.schedules.find(item => item.ID === this.currentSchedule?.ID)
      if (tempSchedule) {
        // create course
        tempSchedule.courses.push(newCourse)
        this.coutColNumArr = this.countCol()
        // close course form
        this.onCloseCourseFormClick()
      }
    }
  }

}
