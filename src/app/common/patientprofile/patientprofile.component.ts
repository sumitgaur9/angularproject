import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { defaultImage } from 'src/app/shared/api.constant';
@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {

  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() calledFrom: string = '';

  @Input() getpatientprofileid: string = '';

  @Output() ClosePopup: EventEmitter<any> = new EventEmitter();
  @Output() patientProfileResponseReturn: EventEmitter<any> = new EventEmitter();


  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public currentUser;

  public patientform = new FormGroup({
    name: new FormControl(""),
    newimage: new FormControl(),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    image: new FormControl(""),
    phoneno: new FormControl(""),
    address: new FormControl(""),
    age: new FormControl(18),    
    id: new FormControl(""),
    participantID: new FormControl(""),
    description: new FormControl(""),
  });

  public passwordPatternError = false;


  public uploadreportdatainput: any;
  public testimageform = new FormGroup({
    image: new FormControl("")
  });

  public uploadResult = "";
  public UploadFile = [];
  public UploadFileName = "";
  getImageValue;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
      if(this.getpatientprofileid!=undefined&& this.getpatientprofileid!=null && this.getpatientprofileid!='')
      {
        this.Get_PatientProfile();   
      }
  }


  get f() { return this.patientform.controls; }


  Get_PatientProfile() {
    let dataobj = {
    };
    let patientid = this.getpatientprofileid;
    this._apiservice.Get_PatientProfile(dataobj, patientid).subscribe(data => {
      if (data) {
        console.log("data", data);
        if (data.name != undefined) {
          this.patientform.patchValue({
            name: data.name
          });
        }
        if (data.email != undefined) {
          this.patientform.patchValue({
            email: data.email
          });
        }
        if (data.image != undefined) {
          this.patientform.patchValue({
            image: data.image
          });
        }
        if (data.newimage != undefined && data.newimage.data != undefined) {
          this.getImageValue = this.arrayBufferToBase64(data.newimage.data.data);//need to update data in base 64

          this.patientform.patchValue({
            newimage: data.newimage
          });
        }
        else
        {
          this.getImageValue=defaultImage.patientlink;
        }

      
        if (data.phoneno != undefined) {
          this.patientform.patchValue({
            phoneno: data.phoneno
          });
        }
        if (data.address != undefined) {
          this.patientform.patchValue({
            address: data.address
          });
        }
        if (data.age != undefined) {
          this.patientform.patchValue({
            age: data.age
          });
        }
        
        if (data._id != undefined) {
          this.patientform.patchValue({
            id: data._id
          });
        }
        if (data.description != undefined) {
          this.patientform.patchValue({
            description: data.description
          });
        }


        if (data.participantID != undefined) {
          this.patientform.patchValue({
            participantID: data.participantID
          });
        }

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  callUpdataAPI() {
    // if (this.calledFrom == 'frompatientlistpage') {
    //   this.Update_PatientProfile();
    // }
    // else {
    //   if(this.currentUser.role<1)
    //   {
    //     this.Update_PatientProfile();
    //   }
    //   else
    //   {
    //     this.Save_NewPatientProfileFromBookAppointment();
    //   }
    // }
    if(this.getpatientprofileid!=undefined&& this.getpatientprofileid!=null && this.getpatientprofileid!='')
    {
      this.Update_PatientProfile();
    }
    else{
      this.Save_NewPatientProfileFromBookAppointment();
    }
  }

  Save_NewPatientProfileFromBookAppointment() {
    this.submitted = true;
    // if (this.patientform.invalid) {
    //   return;
    // }
    this.errorMessage = "";
    let values = this.patientform.value;

    var formData = new FormData();
    formData.append('image', '');
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('name', this.patientform.value.name);
    formData.append('email', this.patientform.value.email);
    formData.append('phoneno', this.patientform.value.phoneno);
    formData.append('address', this.patientform.value.address);
    formData.append('age', this.patientform.value.age);    
    formData.append('id', this.patientform.value.id);
    formData.append('participantID', this.patientform.value.participantID);
    formData.append('description', this.patientform.value.description);
    this._apiservice.Save_NewPatientProfileFromBookAppointment(formData).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('Thanks to being a part of our platform');
        this.patientProfileResponseReturn.emit(data.patient)
        this.CloseModal(true);
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

    var formData = new FormData();
    formData.append('image', '');
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('name', this.patientform.value.name);
    formData.append('email', this.patientform.value.email);
    formData.append('phoneno', this.patientform.value.phoneno);
    formData.append('address', this.patientform.value.address);
    formData.append('age', this.patientform.value.age);    
    formData.append('id', this.patientform.value.id);
    formData.append('participantID', this.patientform.value.participantID);
    formData.append('description', this.patientform.value.description);

    this._apiservice.Update_PatientProfile(formData, this.patientform.value.id).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('Updated Sucessfully');
        this.patientProfileResponseReturn.emit(data.pat)
        this.CloseModal(true);
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

    this.main();

  }

  async main() {
    const files = document.querySelector('#myfile') as HTMLInputElement;
    const file = files.files[0];
    const result = await this.utilityservice.toBase64(file).catch(e => Error(e));
    if (result instanceof Error) {
      console.log('Error: ', result.message);
      return;
    }
    this.getImageValue = result;
  }






  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);

  }
}
