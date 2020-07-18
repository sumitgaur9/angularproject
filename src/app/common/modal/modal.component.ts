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
       if(this.modalId=="showForgotPasswordtPopup"){
          jQuery('.modal-dialog.popupModel').css({"max-width":"780px"});
        } else {
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

