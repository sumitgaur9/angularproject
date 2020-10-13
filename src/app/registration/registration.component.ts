import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { RegistrationMsg } from 'src/app/shared/api.constant'

declare var $: any;


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public errorMessage: string = '';
  phoneNumberPattern = "^\\d{10}$";

  public submitted: boolean = false;
  code;
  isInvalidCaptcha: boolean = false;
  isVisibleSendOTPbutton: boolean = false;
  inActiveEmailID = '';
  public phoneNoCountryCode:string='+91';
  OTPFromRegistrationForm='';
  OTPFromAPI='';
  isRegMobileNoVerified:boolean=false;
  isInvalidMobileError = true;
  isverifyOTPbtnClicked:boolean=false;

  public userInfo = new FormGroup({
    email: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    role: new FormControl(0, [Validators.required]),
    phoneno: new FormControl("", [Validators.required, Validators.pattern(this.phoneNumberPattern)]),   
    gender: new FormControl(1, [Validators.required]),

  });

  public tempForm = new FormGroup({
    OTPFromRegistrationForm: new FormControl("", ),
  });



  get f() { return this.userInfo.controls; }
  get h() { return this.tempForm.controls; }

  ngOnInit() {
    this.createCaptcha();
  }

  constructor(private router: Router, private utilityservice: UtililtyFunctions, private _apiservice: APIService, private toastr: ToastrService) { }

  registration() {
    this.errorMessage = '';
    this.inActiveEmailID = '';
    this.isVisibleSendOTPbutton = false;
    let dataobj = {
      email: this.userInfo.value.email,
      name: this.userInfo.value.name,
      password: this.userInfo.value.password,
      role: Number(this.userInfo.value.role),
      phoneno: Number(this.userInfo.value.phoneno),
      gender: Number(this.userInfo.value.phoneno),      
    }
    this.submitted = true;
    this.isInvalidCaptcha = false;
    if (!this.validateCaptcha()) {
      this.isInvalidCaptcha = true;
      return;
    }
    this.isInvalidMobileError = false;
    if (!this.isRegMobileNoVerified) {
      this.isInvalidMobileError = true;
      return;
    }
    
    if (this.userInfo.invalid) {
      this.isInvalidCaptcha = false;
      this.createCaptcha();
      return;
    }
    let values = dataobj
    this._apiservice.registration(values).subscribe(data => {
      if (data) {
        this.toastr.success('Registration Successfully');
        this.loginUser(values.email,values.password)
        // this.router.navigate(['/login']);
      }
    }, error => {
      if (error && error.status == 501) {
        this.toastr.warning("Account is already registered", '', {
          timeOut: 8000,
        });
        let tempdataobj = {
          email: this.userInfo.value.email,
          password: this.userInfo.value.password,
        }
        this.router.navigate(['/login']);
        setTimeout(() => {
          this.utilityservice.fromRegPageSendDataToLogin.next(tempdataobj);
        }, 10);
      }
      else if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
    });
  }

  loginUser(email,password) {
    let dataobj ={
      email: email,
      password: password
    }
    this._apiservice.signIn(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data);
        if (data.token && data.token != "" && data.token != null) {
          let datainput: any = {};
          this.utilityservice.navigateToSpecificPage(data.user.role);
          this.utilityservice.onLoginSuccessfully.next();
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  navigateToLoginPage() {
    this.router.navigate(['/login']);

  }
  verifyRegMobOTP() {
    this.isverifyOTPbtnClicked = true;
    if (this.h.OTPFromRegistrationForm.value == this.OTPFromAPI) {
      this.isRegMobileNoVerified = true;
    } else {
      this.isRegMobileNoVerified = false;
    }
  }

  sendOTP(number){
    this.GenerateOTP(number)
  }

  GenerateOTP(number) {
    
    let dataobj = {
      "phone": number
    }
    this._apiservice.GenerateOTPToPhone(dataobj).subscribe(data => {
      if (data) {
        console.log("OTP Data is this..", data);
         this.OTPFromAPI = data.response.OTP;
        // this.inputForVerifyOTP.regMobileNo = data.response.regMobileNo;
        // this.openVerifyOTPPopup();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

 

  getMessage(formcontrol: any, formControlName: any, fieldDisplayName: string) {
    return this.utilityservice.getErrorMessage(formcontrol, formControlName, fieldDisplayName);
  }

  createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
  }

  validateCaptcha() {
    event.preventDefault();
    debugger
    let docelement = document.getElementById("cpatchaTextBox") as HTMLInputElement
    if (docelement.value == this.code) {
      return true;
    } else {
      this.createCaptcha();
      return false;
    }
  }
}
  // email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
