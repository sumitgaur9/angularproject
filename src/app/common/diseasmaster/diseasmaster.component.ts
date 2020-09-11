import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-diseasmaster',
  templateUrl: './diseasmaster.component.html',
  styleUrls: ['./diseasmaster.component.css']
})
export class DiseasmasterComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Input() userEmail = null;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }


  public diseaseDataArray=[
    {"name":"fever"},
    {"name":"cold"},
    {"name":"heart-attack"},
    {"name":"Migrane"},
    {"name":"Dipression"},
    {"name":"Diabetes"}
  ];

  public takeCareByDataArray=[];

  public submitted = false;
  errorMessage = '';

  public diseasMasterForm = new FormGroup({
    diseaseName: new FormControl(""),
    takeCareBy: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));

    this.Get_ExpertiseList();

  }

  get f() { return this.diseasMasterForm.controls; }

  Get_ExpertiseList() {
    let dataobj={
    };
    this._apiservice.Get_ExpertiseList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_ExpertiseListGet_ExpertiseList",data);
        this.takeCareByDataArray=data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

 

  Save_Disease() {
    this.submitted = true;
    if (this.diseasMasterForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.diseasMasterForm.value;
    this._apiservice.Save_Disease(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}


