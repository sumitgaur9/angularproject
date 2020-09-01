import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-labtechnicianprofile',
  templateUrl: './labtechnicianprofile.component.html',
  styleUrls: ['./labtechnicianprofile.component.css']
})

export class LabtechnicianprofileComponent implements OnInit {
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

  public labTechform = new FormGroup({
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
    participantID:new FormControl(""),
    description: new FormControl(""),
  });

  public passwordPatternError = false;
public expertiesArrayData:any=[];
  

  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  this.Get_LabTechnicianProfile();
  this.Get_ExpertiseList();
  }


  get f() { return this.labTechform.controls; }

  Get_LabTechnicianProfile() {
    let dataobj={
    };
    this._apiservice.Get_LabTechnicianProfile(dataobj,this.currentUser.roleBaseId).subscribe(data => {
      if (data) {
        console.log("data",data);
        if(data.name!=undefined)
        {
          this.labTechform.patchValue({
            name: data.name
          });
        }
        if(data.email!=undefined)
        {
          this.labTechform.patchValue({
            email: data.email
          });
        }
        if(data.image!=undefined)
        {
          this.labTechform.patchValue({
            image: data.image
          });
        }
        if(data.description!=undefined)
        {
          this.labTechform.patchValue({
            description: data.description
          });
        }

        if(data.experties!=undefined)
        {
          this.labTechform.patchValue({
            experties: data.experties
          });
        }
        if(data.phoneno!=undefined)
        {
          this.labTechform.patchValue({
            phoneno: data.phoneno
          });
        }
        if(data.timeAvailablity!=undefined)
        {
          this.labTechform.patchValue({
            timeAvailablity: data.timeAvailablity
          });
        }
        if(data.charges!=undefined)
        {
          this.labTechform.patchValue({
            charges: data.charges
          });
        }

        if(data.area!=undefined)
        {
          this.labTechform.patchValue({
            area: data.area
          });
        }
        if(data.qualification!=undefined)
        {
          this.labTechform.patchValue({
            qualification: data.qualification
          });
        }
        if(data._id!=undefined)
        {
          this.labTechform.patchValue({
            id: data._id
          });
        }

        if(data.participantID!=undefined)
        {
          this.labTechform.patchValue({
            participantID: data.participantID
          });
        }

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Update_LabTechnicianProfile() {
    this.submitted = true;
    if (this.labTechform.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.labTechform.value;
    this._apiservice.Update_LabTechnicianProfile(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks for lab technician doctor profile');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      this.toastr.error(error.error.message);
    });
  }
  
  Get_ExpertiseList() {
    let dataobj={
    };
    this._apiservice.Get_ExpertiseList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_ExpertiseListGet_ExpertiseList",data);
        this.expertiesArrayData=data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}