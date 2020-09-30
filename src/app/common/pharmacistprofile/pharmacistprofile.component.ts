import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { defaultImage } from 'src/app/shared/api.constant';

@Component({
  selector: 'app-pharmacistprofile',
  templateUrl: './pharmacistprofile.component.html',
  styleUrls: ['./pharmacistprofile.component.css']
})
export class PharmacistprofileComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() getpharmacistprofileid:string='';
  
  @Output() ClosePopup: EventEmitter<any> = new EventEmitter();

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public pharmacistProfileForm = new FormGroup({
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

  public passwordPatternError = false;
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
    this.Get_PharmacistProfile();
  }

  get f() { return this.pharmacistProfileForm.controls; }

 



  Get_PharmacistProfile() {
    let dataobj={
    };
    let pharmacistid=this.currentUser.roleBaseId;
    if(this.currentUser.user.role==11)
    {
      pharmacistid=this.getpharmacistprofileid;
    }
    this._apiservice.Get_PharmacistProfile(dataobj,pharmacistid).subscribe(data => {
      if (data) {
        console.log("data",data);
        if(data.name!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            name: data.name
          });
        }
        if(data.description!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            description: data.description
          });
        }

        if(data.email!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            email: data.email
          });
        }
       
  if(data.image!=undefined)
  {
    this.pharmacistProfileForm.patchValue({
      image: data.image            
    });
  }
  if(data.newimage!=undefined && data.newimage.data!=undefined)
  {
    this.getImageValue = this.arrayBufferToBase64(data.newimage.data.data);//need to update data in base 64
    
    this.pharmacistProfileForm.patchValue({
      newimage: data.newimage            
    });
  }
  else
  {
    this.getImageValue=defaultImage.pharmacistlink;
  }
        if(data.experties!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            experties: data.experties
          });
        }
        if(data.phoneno!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            phoneno: data.phoneno
          });
        }
        if(data.timeAvailablity!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            timeAvailablity: data.timeAvailablity
          });
        }
        if(data.charges!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            charges: data.charges
          });
        }

        if(data.area!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            area: data.area
          });
        }
        if(data.qualification!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            qualification: data.qualification
          });
        }
        if(data._id!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            id: data._id
          });
        }
        if(data.participantID!=undefined)
        {
          this.pharmacistProfileForm.patchValue({
            participantID: data.participantID
          });
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Update_PharmacistProfile() {
    this.submitted = true;
    if (this.pharmacistProfileForm.invalid) {
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
    formData.append('name', this.pharmacistProfileForm.value.name);
    formData.append('email', this.pharmacistProfileForm.value.email);
    formData.append('phoneno', this.pharmacistProfileForm.value.phoneno);
    formData.append('experties', this.pharmacistProfileForm.value.experties);
    formData.append('timeAvailablity', this.pharmacistProfileForm.value.timeAvailablity);
    formData.append('charges', this.pharmacistProfileForm.value.charges);
    formData.append('area', this.pharmacistProfileForm.value.area);
    formData.append('qualification', this.pharmacistProfileForm.value.qualification);
    formData.append('id', this.pharmacistProfileForm.value.id);
    formData.append('participantID', this.pharmacistProfileForm.value.participantID);
    formData.append('description', this.pharmacistProfileForm.value.description);
    this._apiservice.Update_PharmacistProfile(formData,this.pharmacistProfileForm.value.id).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('Thanks to being a part of our platform');
        this.CloseModal(true);
       // this.router.navigate(['/pharmacistlist']);
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
