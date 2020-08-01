import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
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
    experties: new FormControl(""),
    phoneno: new FormControl(""),
    timeAvailablity: new FormControl(""),
    charges: new FormControl(""),
    area: new FormControl(""),
    qualification: new FormControl(""),
    id: new FormControl(""),
  });

  public passwordPatternError = false;

  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  this.Get_DoctorProfile();
  }


  get f() { return this.doctorform.controls; }

  Get_DoctorProfile() {
    let dataobj={
    };
    this._apiservice.Get_DoctorProfile(dataobj,this.currentUser.roleBaseId).subscribe(data => {
      if (data) {
        console.log("data",data);
        if(data.name!=undefined)
        {
          this.doctorform.patchValue({
            name: data.name
          });
        }
        if(data.email!=undefined)
        {
          this.doctorform.patchValue({
            email: data.email
          });
        }
        if(data.image!=undefined)
        {
          this.doctorform.patchValue({
            image: data.image
          });
        }
        if(data.experties!=undefined)
        {
          this.doctorform.patchValue({
            experties: data.experties
          });
        }
        if(data.phoneno!=undefined)
        {
          this.doctorform.patchValue({
            phoneno: data.phoneno
          });
        }
        if(data.timeAvailablity!=undefined)
        {
          this.doctorform.patchValue({
            timeAvailablity: data.timeAvailablity
          });
        }
        if(data.charges!=undefined)
        {
          this.doctorform.patchValue({
            charges: data.charges
          });
        }

        if(data.area!=undefined)
        {
          this.doctorform.patchValue({
            area: data.area
          });
        }
        if(data.qualification!=undefined)
        {
          this.doctorform.patchValue({
            qualification: data.qualification
          });
        }
        if(data._id!=undefined)
        {
          this.doctorform.patchValue({
            id: data._id
          });
        }
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  Update_DoctorProfile() {
    this.submitted = true;
    if (this.doctorform.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.doctorform.value;
    dataobj["participantID"]=this.currentUser.roleBaseId;
    this._apiservice.Update_DoctorProfile(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks for dubmit doctor profile');
        this.CloseModal();
      //  this.router.navigate(['/doctorlist']);
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}
