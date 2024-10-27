import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _authService : AuthService , private _router: Router){}

  // & Variable Check The Loading Is True Or Not & //
  isLoading:boolean=false;

  // & Variable Check The Form Is Valid Or Not & //
  isNotValidForm:boolean=false;

  // & Variable Hold The Error Message From API  & //
  errorMsg:string="";

  loginForm:FormGroup = new FormGroup({
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
  })


  login():void{
    this.isLoading = true

    if (this.loginForm.valid){
      this._authService.Login(this.loginForm.value).subscribe({
        next: (res)=>{
          // console.log(res);
          this.isLoading=false;
          localStorage.setItem("Token" , res.token)
          // Decode Token
          this._authService.decodeUser()
          this._router.navigate(['/Home']);
        },
        error: (err)=>{
          // console.log(err);
          this.errorMsg=err.error.message;
          this.isLoading = false
        }
      })
    }

    else{
      this.isNotValidForm = true
    }
  }

}
