import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  getForm() : User{
    return {
      email: this.loginForm.value.email,
      password : this.loginForm.value.password
    }
  }

  clearForm(){
    this.loginForm.get('email')?.setValue('')
    this.loginForm.get('password')?.setValue('')
  }

  onClickValidate(){
    this.loginForm.get('email')?.markAsTouched()
    this.loginForm.get('password')?.markAsTouched()
  }

  onSubmit(){
    this.onClickValidate()
    if(!this.loginForm.invalid){
      console.log(this.getForm())
    }
  }

}
