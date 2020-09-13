import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'ad-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() title: String = '';
  @Input() modalId: String = "";
  
  constructor(private el: ElementRef,) { }

  ngOnInit() {
       if(this.modalId=="confirmationModal" || this.modalId=="showForgotPasswordPopup"
       || this.modalId=="showVerifyOTPPopup"|| this.modalId=="showPasswordSetupPopup" || this.modalId=="showChangePasswordPopup" ){
        jQuery('.modal-footer').css({"display":"block"});
        jQuery('.modal-footer').css({"padding":"0"});
        jQuery('.modal-dialog.popupModel').css({"max-width":"800px"});
      } else {
       jQuery('.modal-footer').css({"display":"flex"});
       jQuery('.modal-footer').css({"padding":"0.75rem"});
     }
     if(this.modalId!="confirmationModal"){
      jQuery('.modal-dialog.popupModel').css({"max-width":"654px"});
    } 
       

       }
  ngAfterViewInit(){
    const modal = jQuery(this.el.nativeElement.querySelector('.modal'));
    modal.modal({backdrop: 'static'}) // for prevent closing popup on outside click
    }

  closePopup(){
    jQuery(this.el.nativeElement.querySelector('.modal')).modal('hide');
    // jQuery('html, body').css('overflow','auto');
  }
}

