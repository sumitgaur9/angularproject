
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { HomePageImageSize } from 'src/app/shared/api.constant'


@Component({
  selector: 'app-prescriptionupload',
  templateUrl: './prescriptionupload.component.html',
  styleUrls: ['./prescriptionupload.component.css']
})
export class PrescriptionuploadComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() medicineData = null;

  @Input() getdoctorprofileid: string = '';




  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public prescriptionUploadForm = new FormGroup({
    medicineName: new FormControl(""),
    medicineID: new FormControl(""),
    companyName: new FormControl(""), //Only for UI
    price: new FormControl(""), //Only for UI
    patientNname: new FormControl(""),
    patientAge: new FormControl(18),
    patientSex: new FormControl(1),
    patientEmail: new FormControl(""),
    patientID: new FormControl(""),
    phoneno: new FormControl(""),
    RequestDate: new FormControl(""),

  // newimage:
  // {
  //   data: Buffer,
  //   contentType: String
  // },
  });

  public imageForDataArray: any = [{ "id": '1', "name": "TopNavImage" }, { "id": '2', "name": "WhatWeDo" },
  { "id": '3', "name": "Servicesimage1" }, { "id": '4', "name": "Servicesimage2" }, { "id": '5', "name": "Servicesimage3" },
  { "id": '6', "name": "Servicesimage4" }, { "id": '7', "name": "SpecialistClinicimage1" }, { "id": '8', "name": "SpecialistClinicimage2" },
  { "id": '9', "name": "SpecialistClinicimage3" }];

  public currentUserMeRes;
  public uploadreportdatainput: any;
  public testimageform = new FormGroup({
    image: new FormControl(""),

  });

  public uploadResult = "";
  public UploadFile = [];
  public UploadFileName = "";
  getImageValue;
  getMedicineImageValue;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }


  ngOnInit() {
    this.currentUserMeRes = JSON.parse(window.sessionStorage.getItem("currentusermedata"));
    this.filPatientAndMedicinelData(this.medicineData, this.currentUserMeRes);

    if (this.medicineData.newimage != undefined && this.medicineData.newimage.data != undefined) {
      this.getMedicineImageValue = this.arrayBufferToBase64(this.medicineData.newimage.data.data);//need to update data in base 64
    }
  }
  get f() { return this.prescriptionUploadForm.controls; }

  filPatientAndMedicinelData(medicineData, currentUserMeRes){

    this.prescriptionUploadForm.patchValue({
      medicineName: medicineData.medicineName,
      medicineID: medicineData._id,
      companyName: medicineData.companyName, //only for UI
      price: medicineData.price,             //only for UI
      patientNname: currentUserMeRes.user.name,
      patientAge: currentUserMeRes.user.age,
      patientSex: currentUserMeRes.user.gender,
      patientEmail: currentUserMeRes.user.email,
      patientID: currentUserMeRes.user._id,
      phoneno: currentUserMeRes.user.phoneno,
      RequestDate: this.utilityservice.ToDisplayDateFormat(new Date()),
    });
  }


  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);

  }

  Save_UploadPrescriptionForMedicineApproval() {
    this.submitted = true;
    if (this.prescriptionUploadForm.invalid) {
      return;
    }
    this.errorMessage = "";
    var formData = new FormData();
    formData.append('newimage', '');
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('medicineName', this.prescriptionUploadForm.value.medicineName);
    formData.append('medicineID', this.prescriptionUploadForm.value.medicineID);
    formData.append('patientNname', this.prescriptionUploadForm.value.patientNname);
    formData.append('patientAge', this.prescriptionUploadForm.value.patientAge);
    formData.append('patientSex', this.prescriptionUploadForm.value.patientSex);
    formData.append('patientEmail', this.prescriptionUploadForm.value.patientEmail);
    formData.append('patientID', this.prescriptionUploadForm.value.patientID);
    formData.append('phoneno', this.prescriptionUploadForm.value.phoneno);
    formData.append('RequestDate', this.prescriptionUploadForm.value.RequestDate);

    this._apiservice.Save_UploadPrescriptionForMedicineApproval(formData).subscribe(data => {
      if (data) {
        this.toastr.success('Thanks for requesting, wait for some time till approval');
        this.CloseModal(true);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      this.toastr.error(error.error.message);
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



  // Get_WebsiteImageByLocationEnum(val) {
  //   let dataobj = {
  //   };
  //   this._apiservice.Get_WebsiteImageByLocationEnum(dataobj, val).subscribe(data => {
  //     if (data) {
  //       this.getImageValue = '';
  //       if (data.image != undefined && data.image.data != undefined) {
  //         this.getImageValue = this.arrayBufferToBase64(data.image.data.data);//need to update data in base 64
  //       }

  //     }
  //   }, error => {
  //     this.errorMessage = error.error.message; this.toastr.error(error.error.message);
  //   });
  // }

}






