
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
declare var $ : any;

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input() showModal: boolean = false;
  @Input() showData = '';
  @Output() ClosePopup = new EventEmitter();

 isCloseButtonVisible:boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
    // let currentUrl:string = this.router.url;
    // if(currentUrl.includes("admin")){
    //   this.isCloseButtonVisible = true;
    //   $("body").addClass("adminPage");
    // } else { this.isCloseButtonVisible = false; 
    //   $("body").removeClass("adminPage");
    // }
  
  }

  ngOnDestroy(){
    this.closeModal(false);
  }

 closeModal(isDelete = false) {
    this.ClosePopup.emit(isDelete);
  }


}