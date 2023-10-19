import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      name : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")])
    })
  }

  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get name(){
    return this.registerForm.get('name')
  }

  getForm(): User{
    return{
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name
    }
  }

  clearForm(){
    this.registerForm.get('email')?.setValue('')
    this.registerForm.get('password')?.setValue('')
    this.registerForm.get('name')?.setValue('')
  }

  onClickValidate(){
    this.registerForm.get('email')?.markAsTouched()
    this.registerForm.get('password')?.markAsTouched()
    this.registerForm.get('name')?.markAsTouched()
  }

  onSubmit(){
    this.onClickValidate()
    if(!this.registerForm.invalid){
      console.log(this.getForm())
    }
  }

}
