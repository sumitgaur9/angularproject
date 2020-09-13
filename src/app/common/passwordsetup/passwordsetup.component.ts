import { Component, OnInit, Input, EventEmitter, Output, ElementRef, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matches } from './../../utils/custom.validations';
import { VALUE_CONSTANTS } from './../../utils/values.constants';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-passwordsetup',
  templateUrl: './passwordsetup.component.html',
  styleUrls: ['./passwordsetup.component.css']
})
export class PasswordsetupComponent implements OnInit {
  
  @Input() showModal: boolean = false;
  @Output() ClosePopup = new EventEmitter();
  @Input() userEmail:string;
  @Input() calledFrom:string;

  

  
  CloseModal() {
    this.ClosePopup.emit();
  }
  submitted = false;
  errorMessage = '';
  passwordInfo = this.fb.group(
    {
      oldpassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      // oldpassword: ["", [Validators.required, Validators.pattern(VALUE_CONSTANTS.passwordPattern)]],
      // newPassword: ["", [Validators.required, Validators.pattern(VALUE_CONSTANTS.passwordPattern)]],
      // confirmPassword: ["", [Validators.required, Validators.pattern(VALUE_CONSTANTS.passwordPattern)]],
    },
    {
      validator: matches('newPassword', 'confirmPassword')
    }
  );
  passwordPatternError = false;
  public currentUser;

  constructor(private router: Router,  private _apiservice: APIService,
    private el: ElementRef, private toastr: ToastrService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));

    console.log("this.currentUserthis.currentUser",this.currentUser);

  }

  ngOnDestroy() {
    this.CloseModal();
  }

  get f() { return this.passwordInfo.controls; }

  


  forgotPassword() {
    this.errorMessage = '';
    this.submitted = true;
    // if (this.passwordInfo.invalid) {
    //   this.passwordPatternError = true;
    //   for (const key of Object.keys(this.passwordInfo.controls)) {
    //     if (this.passwordInfo.controls[key].invalid) {
    //       const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
    //       invalidControl.focus();
    //       this.passwordInfo.markAllAsTouched();
    //       break;
    //     }
    //   }
    //   return;
    // }
    if (this.passwordInfo.controls['newPassword'].value != this.passwordInfo.controls['confirmPassword'].value) {
      return;
    }
    this.passwordPatternError = false;
    let values:any = {};    
    values['newPassword'] = this.passwordInfo.controls.newPassword.value;
    values['email'] = this.userEmail;
    values['isActivationRequired'] = false;
    if(this.calledFrom=='Registration')
    {
      values['isActivationRequired'] = true;
    }
      this._apiservice.ForgotPassword(values).subscribe(data => {
      if (data) {
        this.toastr.success('You have successfully changed your password', '', {
          timeOut: 5000
        });
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

}
