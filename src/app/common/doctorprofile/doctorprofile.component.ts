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

  @Input() getdoctorprofileid:string='';
  

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
    participantID:new FormControl(""),
    description: new FormControl(""),
  });

  public passwordPatternError = false;
public expertiesArrayData:any=[];
  

  public currentUser;

  /************************** */



  public uploadreportdatainput:any;
  public testimageform = new FormGroup({
    image: new FormControl("")
  });
  
  public uploadResult = "";
  public UploadFile = [];
  public UploadFileName = "";

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  this.Get_DoctorProfile();
  this.Get_ExpertiseList();
  }


  get f() { return this.doctorform.controls; }

  Get_DoctorProfile() {
    let dataobj={
    };
    let doctorid=this.currentUser.roleBaseId;
    if(this.currentUser.user.role==11)
    {
      doctorid=this.getdoctorprofileid;
    }
    this._apiservice.Get_DoctorProfile(dataobj,doctorid).subscribe(data => {
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
        if(data.description!=undefined)
        {
          this.doctorform.patchValue({
            description: data.description
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

        if(data.participantID!=undefined)
        {
          this.doctorform.patchValue({
            participantID: data.participantID
          });
        }

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Update_DoctorProfile() {
    this.submitted = true;
    if (this.doctorform.invalid) {
      return;
    }
    this.errorMessage = "";
    //let dataobj={};



    //dataobj= this.doctorform.value;

    var formData = new FormData();
    formData.append('image', this.UploadFile[0], this.UploadFileName);
    formData.append('name', this.doctorform.value.name);
    formData.append('phoneno', this.doctorform.value.phoneno);
    formData.append('experties', this.doctorform.value.experties);
    formData.append('timeAvailablity', this.doctorform.value.timeAvailablity);
    formData.append('charges', this.doctorform.value.charges);
    formData.append('area', this.doctorform.value.area);
    formData.append('qualification', this.doctorform.value.qualification);
    formData.append('id', this.doctorform.value.id);
    formData.append('participantID', this.doctorform.value.participantID);
    formData.append('description', this.doctorform.value.description);

    this._apiservice.Update_DoctorProfile(formData,this.doctorform.value.id).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks for dubmit doctor profile');
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




  uploadFile(fileInput) {
    if (fileInput.length === 0) { 
      return;
     }
    this.uploadResult = "";
    this.UploadFile = <Array<File>>fileInput.target.files;
    this.UploadFileName = this.UploadFile[0].name;
  }



  Save_UploadLabTestReport () {
    this.errorMessage = "";
    var formData = new FormData();
    formData.append('reportData', this.UploadFile[0], this.UploadFileName);

    formData.append('bookLabTestId', this.uploadreportdatainput.bookLabTestId);
    formData.append('labTechnicanID', this.uploadreportdatainput.labTechnicanID);
    formData.append('labTechnicanName', this.uploadreportdatainput.labTechnicanName);
    formData.append('reportGenerationDate', new Date().toString());


    this._apiservice.Save_UploadLabTestReport (formData).subscribe(data => {
      if (data) {
        this.toastr.success('Report Uploaded sucessfully');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }




}
