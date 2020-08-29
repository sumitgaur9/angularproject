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
  @Input() getpatientprofileid:string='';

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public currentUser;

  public patientform = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    image: new FormControl(""),
    disease: new FormControl(""),
    phoneno: new FormControl(""),
    requiredDoctor: new FormControl(""),
    prefferedTime: new FormControl(""),
    address: new FormControl(""),
    qualification: new FormControl(""),
    id: new FormControl(""),
    participantID: new FormControl(""),
    
  });

  public passwordPatternError = false;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    this.Get_PatientProfile();

  }


  get f() { return this.patientform.controls; }


  Get_PatientProfile() {
    let dataobj={
    };
    let patientid=this.currentUser.roleBaseId;
    if(this.currentUser.user.role==11)
    {
      patientid=this.getpatientprofileid;
    }
    this._apiservice.Get_PatientProfile(dataobj,patientid).subscribe(data => {
      if (data) {
        console.log("data",data);


        if(data.name!=undefined)
        {
          this.patientform.patchValue({
            name: data.name
          });
        }
        if(data.email!=undefined)
        {
          this.patientform.patchValue({
            email: data.email
          });
        }
        if(data.image!=undefined)
        {
          this.patientform.patchValue({
            image: data.image
          });
        }
        if(data.disease!=undefined)
        {
          this.patientform.patchValue({
            disease: data.disease
          });
        }
        if(data.phoneno!=undefined)
        {
          this.patientform.patchValue({
            phoneno: data.phoneno
          });
        }
        if(data.requiredDoctor!=undefined)
        {
          this.patientform.patchValue({
            requiredDoctor: data.requiredDoctor
          });
        }
        if(data.prefferedTime!=undefined)
        {
          this.patientform.patchValue({
            prefferedTime: data.prefferedTime
          });
        }

        if(data.address!=undefined)
        {
          this.patientform.patchValue({
            address: data.address
          });
        }
        if(data.qualification!=undefined)
        {
          this.patientform.patchValue({
            qualification: data.qualification
          });
        }
        if(data._id!=undefined)
        {
          this.patientform.patchValue({
            id: data._id
          });
        }
        if(data.participantID!=undefined)
        {
          this.patientform.patchValue({
            participantID: data.participantID
          });
        }

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  Update_PatientProfile() {
    this.submitted = true;
    if (this.patientform.invalid) {
      return;
    }
    this.errorMessage = "";
    let values = this.patientform.value;
    this._apiservice.Update_PatientProfile(values).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
        this.router.navigate(['/patientlist']);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}
