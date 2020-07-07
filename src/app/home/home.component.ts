import { Component, OnInit } from '@angular/core';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMessage;
  constructor(private utilityservice:UtililtyFunctions,private _apiservice:APIService ) { }

  ngOnInit() {
    this.testtoken();
  }


  testtoken() {
   let dataparam:any={};
    this._apiservice.testheader(dataparam).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
       
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }



}
