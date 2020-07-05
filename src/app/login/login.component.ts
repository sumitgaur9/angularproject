
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { AuthService } from 'src/app/services/auth.service';
 import { Router } from '@angular/router';
// import { UserService } from 'src/app/services/user.service';
// import { UtililtyFunctions } from 'src/app/utils/utils';
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  showPopup: boolean = false;
  submitted: boolean = false;
  errorMessage:string="";
  calledFrom: string = "login";
  resetPasswordToken:string = "";
  userEmail = null;
  showForgotPasswordtPopup = false;
  verifyOtp = false;
  showFirstTimePassPopup = false;

  public loginInfo = new FormGroup({
    usernameOrEmail: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });





    constructor(private router: Router) { }

  ngOnInit() {
  }

  
  get f() { return this.loginInfo.controls; }

  // loginUser() {
  //   this.submitted = true;
  //   if (this.loginInfo.invalid) {
  //     return;
  //   }
  //   this.errorMessage="";
  //   let values = this.loginInfo.value;
  //   this._authService.signIn(values).subscribe(data => {
  //     if (data && data.data) {
  //       console.log("loginUserResponseData..", data.data);
  //       if (data.data.accessToken && data.data.accessToken != "" && data.data.accessToken != null) {
  //         let datainput: any = {};
  //         this._userService.getCurrentUserData(datainput).subscribe(data => {
  //           if (data && data.data) {
  //             this.router.navigate(['']);              
  //             this.utilityservice.onLoginSuccessfully.next();
  //           }
  //         }, error => {
  //         });
  //       }
  //     }
  //   }, error => {
  //     this.errorMessage = error.error.message;
  //   });
  // }

  // getCurrentUserData() {
  //   let datainput: any = {};
  //   this._userService.getCurrentUserData(datainput).subscribe(data => {
  //     if (data && data.data) {
  //       this.router.navigate(['']);    
  //       this.utilityservice.onLoginSuccessfully.next();
  //     }
  //   }, error => {

  //   });
  // }
 


  

}

