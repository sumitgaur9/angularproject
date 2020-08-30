import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pharmacistprofile',
  templateUrl: './pharmacistprofile.component.html',
  styleUrls: ['./pharmacistprofile.component.css']
})
export class PharmacistprofileComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() getpharmacistprofileid:string='';
  
  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
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
  });

  public passwordPatternError = false;
  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
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
    let dataobj={};
    dataobj= this.pharmacistProfileForm.value;
    this._apiservice.Update_PharmacistProfile(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
       // this.router.navigate(['/pharmacistlist']);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


}
