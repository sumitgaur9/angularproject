import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { UtililtyFunctions } from 'src/app/utils/utils';


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
  }

  constructor(private router: Router,private utilityservice:UtililtyFunctions, private _apiservice: APIService, private toastr: ToastrService) { }

  registration() {
    this.errorMessage = '';
    let dataobj = {
      email: this.userInfo.value.email,
      name: this.userInfo.value.name,
      password: this.userInfo.value.password,
      role: Number(this.userInfo.value.role),
      phoneno: Number(this.userInfo.value.phoneno),
      description: this.userInfo.value.description,
    }
    this.submitted = true;
    if (this.userInfo.invalid) {
      return;
    }
    let values = dataobj
    this._apiservice.registration(values).subscribe(data => {
      if (data) {
        this.toastr.success('Registration Successfully');
        this.router.navigate(['/login']);
      }
    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
    });
  }

  navigateToLoginPage() {
    this.router.navigate(['/login']);

  }

  getMessage(formcontrol: any, formControlName: any, fieldDisplayName: string) {
    // if(formControlName=='billingRate' && this.addForm.controls.clientContractStatus.value == 'fp')
    // {
    //   fieldDisplayName = 'Fixed price';
    // }
    return this.utilityservice.getErrorMessage(formcontrol, formControlName, fieldDisplayName);
  }
}
