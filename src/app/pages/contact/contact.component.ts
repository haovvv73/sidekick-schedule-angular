import { Component } from '@angular/core';

interface ContactGroup{
  label : string,
  icon : string,
  color : string,
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  classListContact : boolean = true
  groups : ContactGroup[] = [
    {
      label : 'Friends',
      icon : 'supervisor_account',
      color : 'text-red-600',
    },
    {
      label : 'Family',
      icon : 'home',
      color : 'text-yellow-500',
    },
    {
      label : 'Business',
      icon : 'business',
      color : 'text-sky-600',
    },
  ]

  toggleOnDisplayListContact(){
    this.classListContact = !this.classListContact
  }
}
