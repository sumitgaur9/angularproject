
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
// import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public submitted: boolean = false;
  public errorMessage: string = "";
  passwordType = 'password';

  public showForgotPasswordPopup:boolean=false;
  public showVerifyOTPPopup:boolean=false;
  public showPasswordSetupPopup:boolean=false;

  public inputForVerifyOTP:any={};
  public loginInfo = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });


  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    localStorage.clear();
  }

  get f() { return this.loginInfo.controls; }

  loginUser() {
    //this.GenerateOTP();
    this.submitted = true;
    if (this.loginInfo.invalid) {
      return;
    }
    this.errorMessage = "";
    let values = this.loginInfo.value;
    this._apiservice.signIn(values).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data);
        if (data.token && data.token != "" && data.token != null) {
          let datainput: any = {};
          //this.router.navigate(['/home']);
          this.navigateToSpecificPage(data.user.role);
          this.utilityservice.onLoginSuccessfully.next();
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  GenerateOTP() {
   let dataobj={
     "email": this.loginInfo.controls.email.value
   }
    this._apiservice.GenerateOTP(dataobj).subscribe(data => {
      if (data) {
        console.log("OTP Data is this..", data);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }



  navigateToSpecificPage(roleType) {
    switch (roleType) {
      case 0:
        this.router.navigate(['/patientdashboard']);
        break;
      case 1:
        this.router.navigate(['/doctordashboard']);
        break;
      case 2:
      case 3:
      case 11:
        case 5:
        this.router.navigate(['/home']);
        break;
      case 4:
        this.router.navigate(['/pharmacistdashboard']);
        break;


    }
  }


  public closeForgotPasswordPopup() {
    this.showForgotPasswordPopup = false;
    $('#showForgotPasswordPopup').modal('hide');
  }

  public openForgotPasswordPopup() {
    this.showForgotPasswordPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showForgotPasswordPopup').modal('show');
    }, 100);
  }



  forgotPasswordSet(value) {
    console.log("valuevaluevalue",value);
    this.inputForVerifyOTP.userEmail=value.userEmail;
     this.inputForVerifyOTP.OTPAPIValue=value.OTPAPIValue;
   this.closeForgotPasswordPopup();
   this.openVerifyOTPPopup();
  }

  public openVerifyOTPPopup() {
    this.showVerifyOTPPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVerifyOTPPopup').modal('show');
    }, 100);
  }
 
   public closeVerifyOTPPopup() {
     this.showVerifyOTPPopup = false;
     $('#showVerifyOTPPopup').modal('hide');
   }

   verifyOTPSet(email) {
    console.log("valuevaluevalue",email);
    this.inputForVerifyOTP.userEmail=email;
    this.closeVerifyOTPPopup();
   this.openPasswordSetupPopup();
  }

   public closePasswordSetupPopup() {
    this.showPasswordSetupPopup = false;
    $('#showPasswordSetupPopup').modal('hide');
  }

  public openPasswordSetupPopup() {
    this.showPasswordSetupPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showPasswordSetupPopup').modal('show');
    }, 100);
  }




}

