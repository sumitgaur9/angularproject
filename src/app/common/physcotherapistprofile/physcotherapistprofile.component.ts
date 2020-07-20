import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-physcotherapistprofile',
  templateUrl: './physcotherapistprofile.component.html',
  styleUrls: ['./physcotherapistprofile.component.css']
})
export class PhyscotherapistprofileComponent implements OnInit {

  
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

 
  public physioProfileForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    image: new FormControl(""),
    experties: new FormControl(""),
    phoneno: new FormControl(""),
    timeAvailablity: new FormControl(""),
    charges: new FormControl(""),
    area: new FormControl(""),
    qualification: new FormControl(""),
  });


  public passwordPatternError = false;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
  }

  get f() { return this.physioProfileForm.controls; }

  Save_PhysioProfile() {
    this.submitted = true;
    if (this.physioProfileForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let values = this.physioProfileForm.value;
    this._apiservice.Save_PhysioProfile(values).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
        this.router.navigate(['/patientlist']);
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}
