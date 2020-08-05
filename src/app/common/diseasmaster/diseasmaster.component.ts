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


  public expertiesDataArray=[{"name":"fever"},{"name":"cold"},{"name":"heart-attack"}];
  public takeCareByDataArray=[{"name":"physician"},{"name":"cardiologist"}];


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
  }

  get f() { return this.diseasMasterForm.controls; }


 

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
      this.errorMessage = error.error.message;
    });
  }
}


