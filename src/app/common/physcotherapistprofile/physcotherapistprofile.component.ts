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

  @Input() getphyscoprofileid: string = '';

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
    id: new FormControl(""),
    participantID: new FormControl(""),
    description: new FormControl(""),
    newimage: new FormControl(), 
  });

  public currentUser;

  public passwordPatternError = false;

  public uploadreportdatainput:any;
  public testimageform = new FormGroup({
    image: new FormControl("")
  });
  
  public uploadResult = "";
  public UploadFile = [];
  public UploadFileName = "";
  getImageValue;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    this.Get_PhysioProfile();
  }

  get f() { return this.physioProfileForm.controls; }





  Get_PhysioProfile() {
    let dataobj = {
    };
    let physcoid = this.currentUser.roleBaseId;
    if (this.currentUser.user.role == 11) {
      physcoid = this.getphyscoprofileid;
    }
    this._apiservice.Get_PhysioProfile(dataobj, physcoid).subscribe(data => {
      if (data) {
        console.log("data", data);
        if (data.name != undefined) {
          this.physioProfileForm.patchValue({
            name: data.name
          });
        }
        if (data.email != undefined) {
          this.physioProfileForm.patchValue({
            email: data.email
          });
        }
        if(data.description!=undefined)
        {
          this.physioProfileForm.patchValue({
            description: data.description
          });
        }
        if(data.image!=undefined)
        {
          this.physioProfileForm.patchValue({
            image: data.image            
          });
        }
        if(data.newimage!=undefined && data.newimage.data!=undefined)
        {
          this.getImageValue = this.arrayBufferToBase64(data.newimage.data.data);//need to update data in base 64
          
          this.physioProfileForm.patchValue({
            newimage: data.newimage            
          });
        }
        if (data.experties != undefined) {
          this.physioProfileForm.patchValue({
            experties: data.experties
          });
        }
        if (data.phoneno != undefined) {
          this.physioProfileForm.patchValue({
            phoneno: data.phoneno
          });
        }
        if (data.timeAvailablity != undefined) {
          this.physioProfileForm.patchValue({
            timeAvailablity: data.timeAvailablity
          });
        }
        if (data.charges != undefined) {
          this.physioProfileForm.patchValue({
            charges: data.charges
          });
        }

        if (data.area != undefined) {
          this.physioProfileForm.patchValue({
            area: data.area
          });
        }
        if (data.qualification != undefined) {
          this.physioProfileForm.patchValue({
            qualification: data.qualification
          });
        }
        if (data._id != undefined) {
          this.physioProfileForm.patchValue({
            id: data._id
          });
        }
        if (data.participantID != undefined) {
          this.physioProfileForm.patchValue({
            participantID: data.participantID
          });
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Update_PhysioProfile() {
    this.submitted = true;
    if (this.physioProfileForm.invalid) {
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
    formData.append('name', this.physioProfileForm.value.name);
    formData.append('email', this.physioProfileForm.value.email);
    formData.append('phoneno', this.physioProfileForm.value.phoneno);
    formData.append('experties', this.physioProfileForm.value.experties);
    formData.append('timeAvailablity', this.physioProfileForm.value.timeAvailablity);
    formData.append('charges', this.physioProfileForm.value.charges);
    formData.append('area', this.physioProfileForm.value.area);
    formData.append('qualification', this.physioProfileForm.value.qualification);
    formData.append('id', this.physioProfileForm.value.id);
    formData.append('participantID', this.physioProfileForm.value.participantID);
    formData.append('description', this.physioProfileForm.value.description);
    this._apiservice.Update_PhysioProfile(formData,this.physioProfileForm.value.id).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
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
