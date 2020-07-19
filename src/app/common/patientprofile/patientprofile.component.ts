import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {

  @Input() showModal: boolean = false;
  @Input() userEmail = null;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public doctorform = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    image: new FormControl(""),
    disease: new FormControl(""),
    phoneno: new FormControl(""),
    requiredDoctor: new FormControl(""),
    prefferedTime: new FormControl(""),
    address: new FormControl(""),
    qualification: new FormControl(""),
  });





  public passwordPatternError = false;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  }

  get f() { return this.doctorform.controls; }



  

  Save_DoctorProfile() {
    this.submitted = true;
    if (this.doctorform.invalid) {
      return;
    }
    this.errorMessage = "";
    let values = this.doctorform.value;
    this._apiservice.Save_PatientProfile(values).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
        this.router.navigate(['/patientlist']);
      //   if (data.token && data.token != "" && data.token != null) {
      //     let datainput: any = {};
      //    // this.router.navigate(['/home']);
      // //    this.utilityservice.onLoginSuccessfully.next();
      //   }
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}
