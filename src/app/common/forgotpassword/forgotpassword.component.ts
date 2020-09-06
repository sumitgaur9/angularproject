
import { APIService } from 'src/app/service/api.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { VALUE_CONSTANTS } from './../../utils/values.constants';
import { ToastrService } from 'ngx-toastr';
import { matches } from './../../utils/custom.validations';
declare var $: any;


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit, OnDestroy {

 // @ViewChild("confirmPass", {static:false}) confirmPassField: ElementRef;

  @Input() showModal: boolean = false;
  @Input() userEmail = null;

  public showVerifyForgotPasswordPopup:boolean=false;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

 CloseModal() {
    this.ClosePopup.emit();
  }

 submitted = false;
  errorMessage = '';

  public responseOTP:string='';
  //emailPattern = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';


 forgotPasswordInfo = new FormGroup({
  email: new FormControl("", [Validators.required, Validators.pattern(VALUE_CONSTANTS.emailPattern)]),
  });


  passwordVerifyInfo = new FormGroup({
    Otp: new FormControl("", [Validators.required]),
    newPassword: new FormControl("", [Validators.required]),
  });
  






 passwordPatternError = false;

  constructor(private router: Router,private fb: FormBuilder, private toastr: ToastrService, private _apiservice: APIService, private el: ElementRef) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.CloseModal();
  }

  ngAfterViewInit(){
   // this.confirmPassField.nativeElement.focus();
  }

  get f() { return this.passwordVerifyInfo.controls; }



  // setUserPassword() {
  //   this.errorMessage = '';
  //   this.submitted = true;
  //   if (this.passwordInfo.invalid) {
  //     for (const key of Object.keys(this.passwordInfo.controls)) {
  //       if (this.passwordInfo.controls[key].invalid) {
  //         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
  //         invalidControl.focus();
  //         this.passwordInfo.markAllAsTouched();
  //         //this.scrollToFirstInvalidControl();
  //         break;
  //       }
  //     }
  //     return;
  //   }
  //   let values = this.passwordInfo.value;
  //   this._apiservice.ForgotPassword(values).subscribe(data => {
  //     if (data && data.data==null) {
  //       this.forgotPasswordSet.emit(values.username);
  //     }
  //   }, error => {
  //     if(error && error.error && error.error.message){
  //       this.errorMessage = error.error.message;
  //     }
  //   });
  //  }

  //  onKey()
  //  {
  //   this.submitted = false;
  //  }


   GenerateOTP() {

   
    let dataobj={
      "email": this.forgotPasswordInfo.controls.email.value
    }
     this._apiservice.GenerateOTP(dataobj).subscribe(data => {
       if (data) {
         console.log("OTP Data is this..", data);

this.responseOTP=data.response.OTP;
         this.openVerifyForgotPasswordPopup();


       }
     }, error => {
       this.errorMessage = error.error.message; this.toastr.error(error.error.message);
     });
   }

   forgotPassword() {
    this.errorMessage = '';
    this.submitted = true;
    if (this.passwordVerifyInfo.controls['Otp'].value != this.responseOTP) {
      this.toastr.error('Please Enter Correct OTP', '', {
        timeOut: 5000
      });
      return;
    }
    this.passwordPatternError = false;
    let values:any = {};    
    values['newPassword'] = this.passwordVerifyInfo.controls.newPassword.value;
    values['email'] = this.forgotPasswordInfo.controls.email.value; 
      this._apiservice.ForgotPassword(values).subscribe(data => {
      if (data) {
        this.toastr.success('You have successfully changed your password', '', {
          timeOut: 5000
        });
        this.closeVerifyForgotPasswordPopup();
                  this.CloseModal();

      }

    }, error => {
      if (error && error.error && error.error.message) {
        this.toastr.error(error.error.message, '', {
          timeOut: 5000
        });
      }     
    });
  }


  public closeVerifyForgotPasswordPopup() {
    this.showVerifyForgotPasswordPopup = false;
    $('#showVerifyForgotPasswordPopup').modal('hide');
  }

  public openVerifyForgotPasswordPopup() {
    this.showVerifyForgotPasswordPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVerifyForgotPasswordPopup').modal('show');
    }, 100);
  }




}





