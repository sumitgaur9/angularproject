import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-nurseprofile',
  templateUrl: './nurseprofile.component.html',
  styleUrls: ['./nurseprofile.component.css']
})
export class NurseprofileComponent implements OnInit {

  
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

  public nurseProfileForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    image: new FormControl(""),
    experties: new FormControl(""),
    phoneno: new FormControl(""),
    timeAvailablity: new FormControl(""),
    charges: new FormControl(""),
    area: new FormControl(""),
    qualification: new FormControl(""),
    id: new FormControl(""),
    participantID: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    this.Get_NurseProfile();
  }

  get f() { return this.nurseProfileForm.controls; }


  Get_NurseProfile() {
    let dataobj={
    };
    this._apiservice.Get_NurseProfile(dataobj,this.currentUser.roleBaseId).subscribe(data => {
      if (data) {
        console.log("data",data);
        if(data.name!=undefined)
        {
          this.nurseProfileForm.patchValue({
            name: data.name
          });
        }
        if(data.email!=undefined)
        {
          this.nurseProfileForm.patchValue({
            email: data.email
          });
        }
        if(data.image!=undefined)
        {
          this.nurseProfileForm.patchValue({
            image: data.image
          });
        }
        if(data.experties!=undefined)
        {
          this.nurseProfileForm.patchValue({
            experties: data.experties
          });
        }
        if(data.phoneno!=undefined)
        {
          this.nurseProfileForm.patchValue({
            phoneno: data.phoneno
          });
        }
        if(data.timeAvailablity!=undefined)
        {
          this.nurseProfileForm.patchValue({
            timeAvailablity: data.timeAvailablity
          });
        }
        if(data.charges!=undefined)
        {
          this.nurseProfileForm.patchValue({
            charges: data.charges
          });
        }

        if(data.area!=undefined)
        {
          this.nurseProfileForm.patchValue({
            area: data.area
          });
        }
        if(data.qualification!=undefined)
        {
          this.nurseProfileForm.patchValue({
            qualification: data.qualification
          });
        }
        if(data._id!=undefined)
        {
          this.nurseProfileForm.patchValue({
            id: data._id
          });
        }
        if(data.participantID!=undefined)
        {
          this.nurseProfileForm.patchValue({
            participantID: data.participantID
          });
        }

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Update_NurseProfile() {
    this.submitted = true;
    if (this.nurseProfileForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.nurseProfileForm.value;
    this._apiservice.Update_NurseProfile(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
       // this.router.navigate(['/nurselist']);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}
