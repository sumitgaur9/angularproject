import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {


  @Input() inputForVerifyOTP:any;
  @Input() showModal:string;

  @Output() ClosePopup = new EventEmitter();

  public submitted:boolean=false;
  
  @Output() verifyOTPSet: EventEmitter<any> = new EventEmitter();

  CloseModal() {
    this.ClosePopup.emit();
  }

  VerifyOTPInfo = new FormGroup({
    otp: new FormControl("", [Validators.required]),
    userEmail: new FormControl(""),
  });

  get f() { return this.VerifyOTPInfo.controls; }

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.VerifyOTPInfo.patchValue({
      userEmail: this.inputForVerifyOTP.userEmail
    });
  }
  verifyOTPContinueBtnClick()
  {
    if (this.VerifyOTPInfo.controls['otp'].value != this.inputForVerifyOTP.OTPAPIValue) {
      this.toastr.error('Please Enter Correct OTP', '', {
        timeOut: 5000
      });
      return;
    }
    else
    {
      this.verifyOTPSet.emit(this.inputForVerifyOTP.userEmail)
     // this.CloseModal();
    }
  }
  
}
