import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-nurseprofile',
  templateUrl: './nurseprofile.component.html',
  styleUrls: ['./nurseprofile.component.css']
})
export class NurseprofileComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() getnurseprofileid:string='';
  

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  /************************** */

  public uploadreportdatainput:any;
  public testimageform = new FormGroup({
    image: new FormControl("")
  });
  
  public uploadResult = "";
  public UploadFile = [];
  public UploadFileName = "";
  getImageValue;


  public nurseProfileForm = new FormGroup({
    name: new FormControl(""),
    newimage: new FormControl(), 
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
  });

  public passwordPatternError = false;
  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    this.Get_NurseProfile();
  }

  get f() { return this.nurseProfileForm.controls; }


  Get_NurseProfile() {
    let dataobj={
    };

    let nurseid=this.currentUser.roleBaseId;
    if(this.currentUser.user.role==11)
    {
      nurseid=this.getnurseprofileid;
    }
    this._apiservice.Get_NurseProfile(dataobj,nurseid).subscribe(data => {
      if (data) {
        console.log("data",data);
        if(data.name!=undefined)
        {
          this.nurseProfileForm.patchValue({
            name: data.name
          });
        }
        if(data.description!=undefined)
        {
          this.nurseProfileForm.patchValue({
            description: data.description
          });
        }
        if(data.email!=undefined)
        {
          this.nurseProfileForm.patchValue({
            email: data.email
          });
        }
        if(data.image!=undefined)
        {
          this.nurseProfileForm.patchValue({
            image: data.image            
          });
        }
        if(data.newimage!=undefined && data.newimage.data!=undefined)
        {
          this.getImageValue = this.arrayBufferToBase64(data.newimage.data.data);//need to update data in base 64
          
          this.nurseProfileForm.patchValue({
            newimage: data.newimage            
          });
        }
        if(data.experties!=undefined)
        {
          this.nurseProfileForm.patchValue({
            experties: data.experties
          });
        }
        if(data.phoneno!=undefined)
        {
          this.nurseProfileForm.patchValue({
            phoneno: data.phoneno
          });
        }
        if(data.timeAvailablity!=undefined)
        {
          this.nurseProfileForm.patchValue({
            timeAvailablity: data.timeAvailablity
          });
        }
        if(data.charges!=undefined)
        {
          this.nurseProfileForm.patchValue({
            charges: data.charges
          });
        }

        if(data.area!=undefined)
        {
          this.nurseProfileForm.patchValue({
            area: data.area
          });
        }
        if(data.qualification!=undefined)
        {
          this.nurseProfileForm.patchValue({
            qualification: data.qualification
          });
        }
        if(data._id!=undefined)
        {
          this.nurseProfileForm.patchValue({
            id: data._id
          });
        }
        if(data.participantID!=undefined)
        {
          this.nurseProfileForm.patchValue({
            participantID: data.participantID
          });
        }

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }




  Update_NurseProfile() {
    this.submitted = true;
    if (this.nurseProfileForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.nurseProfileForm.value;
    var formData = new FormData();
    if(this.UploadFile.length && this.UploadFileName){
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else{
      formData.append('newimage', '');
    }
    formData.append('image', '');
    formData.append('name', this.nurseProfileForm.value.name);
    formData.append('email', this.nurseProfileForm.value.email);
    formData.append('phoneno', this.nurseProfileForm.value.phoneno);
    formData.append('experties', this.nurseProfileForm.value.experties);
    formData.append('timeAvailablity', this.nurseProfileForm.value.timeAvailablity);
    formData.append('charges', this.nurseProfileForm.value.charges);
    formData.append('area', this.nurseProfileForm.value.area);
    formData.append('qualification', this.nurseProfileForm.value.qualification);
    formData.append('id', this.nurseProfileForm.value.id);
    formData.append('participantID', this.nurseProfileForm.value.participantID);
    formData.append('description', this.nurseProfileForm.value.description);
      this._apiservice.Update_NurseProfile(formData,this.nurseProfileForm.value.id).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
       // this.router.navigate(['/nurselist']);
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
