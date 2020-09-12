import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { UtililtyFunctions } from 'src/app/utils/utils';
declare var $: any;


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public errorMessage: string = '';

  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phoneNumberPattern = "^\\d{10}$";
//    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),

  public submitted: boolean = false;
  code;
  isInvalidCaptcha:boolean = false;
  isVisibleSendOTPbutton:boolean = false;
  inActiveEmailID = '';
  public showForgotPasswordPopup:boolean=false;

  public userInfo = new FormGroup({
    email: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    phoneno: new FormControl("", [Validators.required, Validators.pattern(this.phoneNumberPattern)])
  });

  get f() { return this.userInfo.controls; }

  ngOnInit() {
    this.createCaptcha();
  }

  constructor(private router: Router,private utilityservice:UtililtyFunctions, private _apiservice: APIService, private toastr: ToastrService) { }

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
      description: this.userInfo.value.description,
    }
    this.submitted = true;
    this.isInvalidCaptcha = false;
    if(!this.validateCaptcha()){
      this.isInvalidCaptcha = true;
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
        this.router.navigate(['/login']);
      }
    }, error => {
       if (error && error.status==501) {
        this.toastr.error(error.error.message);
        this.isVisibleSendOTPbutton = true;
      }
      // else if (error && error.error && error.error.message) {
      //   this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      // }
      else if (error && error.error && error.error.code===11000) {
        if(error.error.keyValue && error.error.keyValue.email){
          this.errorMessage = error.error.keyValue.email+ ' is an InActive account registered with us.';
           this.toastr.error(this.errorMessage);
           this.isVisibleSendOTPbutton = true;
           this.inActiveEmailID = error.error.keyValue.email;
        }
      }
      else if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
    });
  }

  navigateToLoginPage() {
    this.router.navigate(['/login']);

  }

  openOTPpopup(){
    alert("OTP sent to "+this.inActiveEmailID)
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
    }else{
      this.createCaptcha();
      return false;
    }
  }
  

  getMessage(formcontrol: any, formControlName: any, fieldDisplayName: string) {
    // if(formControlName=='billingRate' && this.addForm.controls.clientContractStatus.value == 'fp')
    // {
    //   fieldDisplayName = 'Fixed price';
    // }
    return this.utilityservice.getErrorMessage(formcontrol, formControlName, fieldDisplayName);
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

}
