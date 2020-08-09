
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
// import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
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

  public loginInfo = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private router: Router, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    localStorage.clear();
  }

  get f() { return this.loginInfo.controls; }

  loginUser() {
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
          this.router.navigate(['/home']);
          this.utilityservice.onLoginSuccessfully.next();
        }
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

}

