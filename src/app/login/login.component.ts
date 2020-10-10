
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { APIService } from 'src/app/service/api.service';
import { LoginError } from 'src/app/shared/api.constant'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationMsg } from 'src/app/shared/api.constant'

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
  public showForgotPasswordPopup: boolean = false;
  public showVerifyOTPPopup: boolean = false;
  public showPasswordSetupPopup: boolean = false;
  public isTandCChequed: boolean = false;  
  public inputForVerifyOTP: any = {};
  public inActiveUserRegisterMsg: string = '';
  public isActivateAccountRequired:boolean=false;
  

  public loginInfo = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { 
    this.utilityservice.fromRegPageSendDataToLogin.subscribe((dataobj) => {
      if (dataobj) {
        console.log("fromRegPageSendDataToLogin", dataobj);
        this.loginInfo.patchValue({
          email: dataobj.email,
          password: dataobj.password,  //homevisit/online
        });
      }
    });
  }

  ngOnInit() {
    let object = JSON.parse(window.localStorage.getItem("currentuseremailpassword"));
    if(object && object!==null){
      this.autoFillCredentials();
    }
  }

  get f() { return this.loginInfo.controls; }

  readTandC(event) {
    this.isTandCChequed = event.target.checked;    
  }

  rememberCredentials(){
    let obj = {
      email: this.loginInfo.controls.email.value,
      password: this.loginInfo.controls.password.value,
    }
    localStorage.setItem("currentuseremailpassword", JSON.stringify(obj));    
  }

  autoFillCredentials(){
    let object = JSON.parse(window.localStorage.getItem("currentuseremailpassword"));
    if(object && object!= null && object.email && object.email != '' && object.password && object.password!= '' ){
      this.loginInfo.patchValue({
        email: object.email
      })
      this.loginInfo.patchValue({
        password: object.password
      })
    }

    let obj = {
      email: this.loginInfo.controls.email.value,
      password: this.loginInfo.controls.password.value,
    }
    sessionStorage.setItem("currentusermedata", JSON.stringify(obj));    
  }

  loginUser() {
    this.submitted = true;
    this.isActivateAccountRequired = false;

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
          if (this.isTandCChequed) {
            this.rememberCredentials();
          }
          this.navigateToSpecificPage(data.user.role);
          this.utilityservice.onLoginSuccessfully.next();
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      if (this.errorMessage == LoginError.inactiveUserMSG) {
        this.toastr.error(error.error.message);

        this.inActiveUserRegisterMsg = LoginError.activateAccountHint;
        this.isActivateAccountRequired = true;

      //  this.router.navigate(['/registration'])
      }

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
        this.router.navigate(['/nursedashboard']);
        break;
        case 5:
        this.router.navigate(['/labtechniciandashboard']);
        break;
      case 3:
      case 11:
        this.router.navigate(['/home']);
        break;
      case 4:
        this.router.navigate(['/pharmacistdashboard']);
        break;
        

    }
  }

  GenerateOTP() {
    this.submitted = true;

    if(this.loginInfo.controls.email.value=='' || this.loginInfo.controls.email.value==undefined)
    {
      this.toastr.error("Please Enter Email Id to forgot password");
      return;
    }
    let dataobj = {
      "email": this.loginInfo.controls.email.value//this.inputForVerifyOTP.userEmail
    }
    this._apiservice.GenerateOTP(dataobj).subscribe(data => {
      if (data) {
        console.log("OTP Data is this..", data);
        this.inputForVerifyOTP.OTPAPIValue = data.response.OTP;
        this.inputForVerifyOTP.regMobileNo = data.response.regMobileNo;
        this.inputForVerifyOTP.userEmail = this.loginInfo.controls.email.value;
        this.openVerifyOTPPopup();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
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
    this.inputForVerifyOTP.userEmail = value.userEmail;
    this.closeForgotPasswordPopup();
    this.GenerateOTP();
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
    console.log("valuevaluevalue", email);
    this.inputForVerifyOTP.userEmail = email;
    this.closeVerifyOTPPopup();
    this.openPasswordSetupPopup();
  }

  public closePasswordSetupPopup() {
    this.showPasswordSetupPopup = false;
    $('#showPasswordSetupPopup').modal('hide');
    this.inActiveUserRegisterMsg = '';
    this.isActivateAccountRequired = false;
  }

  public openPasswordSetupPopup() {
    this.showPasswordSetupPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showPasswordSetupPopup').modal('show');
    }, 100);
  }
}

