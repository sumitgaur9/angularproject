
import { APIService } from 'src/app/service/api.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
  @Input() calledFrom: string;
  @Input() email: string='';  
  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();
  CloseModal() {
    this.ClosePopup.emit();
  }

  submitted = false;
  errorMessage = '';
  public showVerifyForgotPasswordPopup: boolean = false;
  public inputForVerifyOTP: any = {}
  passwordPatternError = false;
  public responseOTP: string = '';
  forgotPasswordInfo = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern(VALUE_CONSTANTS.emailPattern)]),
  });
  passwordVerifyInfo = new FormGroup({
    Otp: new FormControl("", [Validators.required]),
    newPassword: new FormControl("", [Validators.required]),
  });

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private _apiservice: APIService, private el: ElementRef) { }

  ngOnInit() {
    this.forgotPasswordInfo.patchValue({
      email: this.email
    });
  }

  ngOnDestroy() {
    this.CloseModal();
  }
  get f() { return this.passwordVerifyInfo.controls; }

  get forgotPWD() { return this.forgotPasswordInfo.controls; }

  public closeVerifyForgotPasswordPopup() {
    this.showVerifyForgotPasswordPopup = false;
    $('#showVerifyForgotPasswordPopup').modal('hide');
  }

  public openVerifyOTPPopup() {
    this.inputForVerifyOTP.userEmail = this.forgotPasswordInfo.controls.email.value;
    this.forgotPasswordSet.emit(this.inputForVerifyOTP);
  }

  ngAfterViewInit() {
    // this.confirmPassField.nativeElement.focus();
  }


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
}





