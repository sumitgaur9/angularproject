import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() userEmail = null;

  @Input() getdoctorprofileid:string='';


  

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public doctorform = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    image: new FormControl(""),
    newimage: new FormControl(),    
    experties: new FormControl(""),
    phoneno: new FormControl(""),
    timeAvailablity: new FormControl(""),
    charges: new FormControl(""),
    area: new FormControl(""),
    qualification: new FormControl(""),
    id: new FormControl(""),
    participantID:new FormControl(""),
    description: new FormControl(""),
    imageChangeForID: new FormControl(""),
    imageChangeForName: new FormControl(""),

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
  getImageValue;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  this.onChangesonChanges();
  }


  get f() { return this.doctorform.controls; }

  

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  
  }

 

  Update_DoctorProfile() {
    this.submitted = true;
    if (this.doctorform.invalid) {
      return;
    }
    this.errorMessage = "";
    var formData = new FormData();
    formData.append('image', '');
    if(this.UploadFile.length && this.UploadFileName){
      formData.append('image', this.UploadFile[0], this.UploadFileName);
    } else{
      formData.append('image', '');
    }
    

    formData.append('locationEnum',this.doctorform.value.imageChangeForID);



    this._apiservice.SaveUpdate_UploadWebsiteImages(formData).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks for dubmit doctor profile');
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
    if(result instanceof Error) {
       console.log('Error: ', result.message);
       return;
    }
    this.getImageValue = result;
 }




  public imageForDataArray:any=[{"id":'1',"name":"TopNavImage"},{"id":'2',"name":"WhatWeDo"},
  {"id":'3',"name":"Servicesimage1"},{"id":'4',"name":"Servicesimage2"},{"id":'5',"name":"Servicesimage3"},
  {"id":'6',"name":"Servicesimage4"}, {"id":'7',"name":"SpecialistClinicimage1"},{"id":'8',"name":"SpecialistClinicimage2"},
  {"id":'9',"name":"SpecialistClinicimage3"}]



  onChangesonChanges(): void {
    this.doctorform.get('imageChangeForID').valueChanges.subscribe(val => {
      this.getImageValue ='';
      this.Get_WebsiteImageByLocationEnum(val);
  })
}



Get_WebsiteImageByLocationEnum(val) {
  let dataobj={
  };
  this._apiservice.Get_WebsiteImageByLocationEnum(dataobj,val).subscribe(data => {
    if (data) {
    //  console.log("Get_ExpertiseListGet_ExpertiseList",data);
     // this.expertiesArrayData=data;
     this.getImageValue ='';
     if(data.image!=undefined && data.image.data!=undefined)
     {
       this.getImageValue = this.arrayBufferToBase64(data.image.data.data);//need to update data in base 64
     }

    }
  }, error => {
    this.errorMessage = error.error.message; this.toastr.error(error.error.message);
  });
}





 


}






