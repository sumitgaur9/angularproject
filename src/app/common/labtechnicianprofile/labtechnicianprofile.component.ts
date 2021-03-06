import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { defaultImage } from 'src/app/shared/api.constant';

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
  @Input() getlabtechnicianprofileid:string='';

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public labTechform = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    image: new FormControl(""),
    phoneno: new FormControl(""),
    charges: new FormControl(""),
    area: new FormControl(""),
    id: new FormControl(""),
    participantID:new FormControl(""),
    description: new FormControl(""),
    newimage: new FormControl(),
  });

  public passwordPatternError = false;
public expertiesArrayData:any=[];
  

  public currentUser;

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
  this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
  this.Get_LabTechnicianProfile();
  this.Get_ExpertiseList();
  }


  get f() { return this.labTechform.controls; }

  Get_LabTechnicianProfile() {
    let dataobj={
    };
    let labtechid=this.currentUser.roleBaseId;
    if(this.currentUser.user.role==11)
    {
      labtechid=this.getlabtechnicianprofileid;
    }
    this._apiservice.Get_LabTechnicianProfile(dataobj,labtechid).subscribe(data => {
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
  if(data.newimage!=undefined && data.newimage.data!=undefined)
  {
    this.getImageValue = this.arrayBufferToBase64(data.newimage.data.data);//need to update data in base 64
    
    this.labTechform.patchValue({
      newimage: data.newimage            
    });
  }
  else
  {
    this.getImageValue=defaultImage.labtechnicianlink;
  }
        if(data.description!=undefined)
        {
          this.labTechform.patchValue({
            description: data.description
          });
        }

       
        if(data.phoneno!=undefined)
        {
          this.labTechform.patchValue({
            phoneno: data.phoneno
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
  

    
 var formData = new FormData();
 formData.append('image', '');
 if(this.UploadFile.length && this.UploadFileName){
   formData.append('newimage', this.UploadFile[0], this.UploadFileName);
 } else{
   formData.append('newimage', '');
 }
 formData.append('name', this.labTechform.value.name);
 formData.append('email', this.labTechform.value.email);
 formData.append('phoneno', this.labTechform.value.phoneno);
 formData.append('charges', this.labTechform.value.charges);
 formData.append('area', this.labTechform.value.area);
 formData.append('id', this.labTechform.value.id);
 formData.append('participantID', this.labTechform.value.participantID);
 formData.append('description', this.labTechform.value.description);
 this._apiservice.Update_LabTechnicianProfile(formData,this.labTechform.value.id).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks for lab technician doctor profile');
        this.CloseModal(true);
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






 arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
   
  }
}
