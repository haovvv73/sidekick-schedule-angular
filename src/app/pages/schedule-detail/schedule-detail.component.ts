import { Component } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import Course from 'src/app/models/schedule/course.mdoel';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent {
  // property
  newTodo = ''
  todos : string[] = [];
  currentCourse : Course | undefined = undefined

  // course form control
  courseForm: boolean = false
  courseGroup: FormGroup = new FormGroup({
    ID:new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/)]),
    day: new FormControl('', [Validators.required]),
    timeStart: new FormControl('', [Validators.required]),
    timeEnd: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    room: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })

  constructor(){
    this.initializeCourse()
  }

  // method
  scrollDownTodo() {
    setTimeout(()=>{
      const scrollableDiv = document.getElementById('scrollableDiv');
      if(scrollableDiv) scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    },400)
  }

  clearInputNewTodo(){
    this.newTodo = ''
  }

  // todo action
  onAddTodoItemClick() {
    if (this.newTodo) {
      // create new todo
      this.todos.push(this.newTodo)
      this.scrollDownTodo()
      this.clearInputNewTodo()
    } else {
      alert('Value required')
    }
  }

  onDeleteTodoItemClick(todoSelected: any) {
    const getTodoSelected = todoSelected.map((item: { value: any; }) => item.value)
    // delete todoSelected
    this.todos = this.todos.filter(item=>{
      return getTodoSelected.indexOf(item) == -1
    })
  }

  // course action
  initializeCourse(){
    this.currentCourse = {
      ID:1,
      name:'C program',
      day:'monday',
      room:'E302',
      address:'lorem street, hcm city',
      description:'lorem today is a hot day, let go swimming together',
      timeStart:'09:00',
      timeEnd:'14:00',
    }
  }

  onOpenCourseFormClick() {
    this.courseForm = true
    this.onReadCourse()
  }

  onCloseCourseFormClick() {
    this.courseForm = false
    this.courseGroup.reset()
  }

  getValueCourseGroup(){
    const ID = this.courseGroup.value.ID
    const name = this.courseGroup.value.name
    const day = this.courseGroup.value.day
    const timeStart = this.courseGroup.value.timeStart
    const timeEnd = this.courseGroup.value.timeEnd
    const address = this.courseGroup.value.address
    const room = this.courseGroup.value.room
    const description = this.courseGroup.value.description
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

  // READ course
  onReadCourse(){
    if(this.currentCourse) this.courseGroup.setValue(this.currentCourse)
  }

  // UPDATE course
  onUpdateCourseClick(){
    const instancCourse = this.getValueCourseGroup()
    // update currentCourse
    this.currentCourse = instancCourse
    // update database

    // close course form
    this.onCloseCourseFormClick()
  }
}
