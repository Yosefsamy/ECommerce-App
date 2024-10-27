import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , RouterLink ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private _authService : AuthService , private _router: Router){}

    // & Variable Check The Loading Is True Or Not & //
    isLoading:boolean=false;

    // & Variable Check The Form Is Valid Or Not & //
    isNotValidForm:boolean=false;
  
    // & Variable Hold The Error Message From API  & //
    errorMsg:string="";

  registerForm:FormGroup = new FormGroup({
    name : new FormControl('' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    rePassword : new FormControl(''),
    phone : new FormControl('' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } ,
  {
    validators:[this.confirmPassword]
  } as FormControlOptions
)

  // Method To Handle Confirm Password
  confirmPassword(group:FormGroup):void{
    const password = group.get("password")
    const rePassword = group.get("rePassword")

    if(rePassword?.value == "")
      rePassword.setErrors({required : true})

    else if(password?.value != rePassword?.value)
      rePassword?.setErrors({mismatch : true})
  }

  register():void{
    this.isLoading = true

    if (this.registerForm.valid){
      this._authService.Register(this.registerForm.value).subscribe({
        next: (res)=>{
          // console.log(res);
          this.isLoading=false;
          this._router.navigate(['/Login']);
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
