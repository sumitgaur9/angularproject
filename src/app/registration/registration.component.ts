import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public errorMessage: string = '';
  public submitted = false;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phoneNumberPattern = "^\\d{10}$";

  public userInfo = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    role:new FormControl("",[Validators.required]),
    description:new FormControl("",[Validators.required]),
  });

  get f() { return this.userInfo.controls; }

  ngOnInit() {
  }


  constructor(private router: Router, private _apiservice: APIService, private toastr: ToastrService) { }


  registration() {
    this.errorMessage = '';
    let dataobj={
      email: this.userInfo.value.email,
      name:  this.userInfo.value.name,
      password: this.userInfo.value.password,
      role:Number(this.userInfo.value.role),
      description: this.userInfo.value.description,
    }
 //   let data= this.userInfo.value;
    let values = dataobj
    this._apiservice.registration(values).subscribe(data => {
      if (data) {
        this.showSuccess();
        this.router.navigate(['/login']);
      }
    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message;
      }
    });
  }

  showSuccess() {
    this.toastr.success('Registration Successfully');
  }
}
