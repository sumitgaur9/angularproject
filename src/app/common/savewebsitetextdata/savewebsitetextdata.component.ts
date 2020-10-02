
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-savewebsitetextdata',
  templateUrl: './savewebsitetextdata.component.html',
  styleUrls: ['./savewebsitetextdata.component.css']
})
export class SavewebsitetextdataComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() ClosePopup = new EventEmitter();
  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }
  errorMessage = '';
  public submitted: boolean;


  public imageForDataArray: any = [
    { "id": '1', "name": "TopNavFirstSectionFirstHeading" },
    { "id": '2', "name": "TopNavFirstSectionSecondHeading" },
    { "id": '3', "name": "TopNavSecondSectionFirstHeading" },
    { "id": '4', "name": "TopNavSecondSectionSecondHeading" },
    { "id": '5', "name": "TopNavSecondSectionThirdHeading" },
    { "id": '6', "name": "TopNavSecondSectionFourthHeading" },
    { "id": '7', "name": "TopNavThirdSectionFirstHeading" },
    { "id": '8', "name": "TopNavFourthSectionSecondHeading" },
    { "id": '9', "name": "WhatWeDoFirstHeading" },
    { "id": '10', "name": "WhatWeDoSecondHeading" },
    { "id": '11', "name": "WhatWeDoThirdHeading" },
    { "id": '12', "name": "WhatWeDoFourthHeading" },
    { "id": '13', "name": "WhatWeDoFirstImgHeading" },
    { "id": '14', "name": "WhatWeDoSecondImgHeading" },
    { "id": '15', "name": "WhatWeDoThirdImgHeading" },
    { "id": '16', "name": "WhatWeDoForthImgHeading" },
    { "id": '17', "name": "SpecialistImage1Heading1" },
    { "id": '18', "name": "SpecialistImage1Heading2" },
    { "id": '19', "name": "SpecialistImage1Heading3" },
    { "id": '20', "name": "SpecialistImage2Heading1" },
    { "id": '21', "name": "SpecialistImage2Heading2" },
    { "id": '22', "name": "SpecialistImage2Heading3" },
    { "id": '23', "name": "SpecialistImage3Heading1" },
    { "id": '24', "name": "SpecialistImage3Heading2" },
    { "id": '25', "name": "SpecialistImage3Heading3" },
    { "id": '26', "name": "FooterFisrtSectionHeading1" },
    { "id": '27', "name": "FooterSecondSectionHeading1" },
    { "id": '28', "name": "FooterSecondSectionHeading2" },
    { "id": '29', "name": "FooterSecondSectionHeading3" },
    { "id": '30', "name": "FooterSecondSectionHeading4" },
    { "id": '31', "name": "FooterThirdSectionHeading1" },
    { "id": '32', "name": "FooterThirdSectionHeading2" },
  ]


  public currentUser;

  public webTextForm = new FormGroup({
    textData: new FormControl(""),
    locationEnum: new FormControl("")
  });


  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }


  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.onChangesonChanges();
  }
  get f() { return this.webTextForm.controls; }



  SaveUpdate_WebsiteTextData() {
    this.submitted = true;
    if (this.webTextForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj: any = {};
    dataobj = this.webTextForm.value;
    this._apiservice.SaveUpdate_WebsiteTextData(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('Thanks for update website text');
        this.CloseModal(true);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      this.toastr.error(error.error.message);
    });
  }




  onChangesonChanges(): void {
    this.webTextForm.get('locationEnum').valueChanges.subscribe(val => {
      this.Get_WebsiteTextDataByLocationEnum(val);
    })
  }

  Get_WebsiteTextDataByLocationEnum(val) {
    let dataobj = {
    };
    this._apiservice.Get_WebsiteTextDataByLocationEnum(dataobj, val).subscribe(data => {
      if (data) {
        this.webTextForm.patchValue({
          textData: data.textData,
          locationEnum: data.locationEnum
        })
        //set description value

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

}







