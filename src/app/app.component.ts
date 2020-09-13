import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GTMFunction } from './utils/gtm';

import { Router } from '@angular/router';
import { MessagingService } from './service/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'newProject';
  title = 'push-notification';
  message;

  showHeaderFooter: boolean = true;

  constructor(private router: Router, private GTMFunction: GTMFunction, private messagingService: MessagingService) {
    router.events.subscribe((val) => {

      if(location.hash){
      //  console.log("this.router.url",location.hash);
        this.GTMFunction.pageview(location.hash);
      }
      this.showHeaderFooter = true;

      if (location.hash == '#/login' ||location.hash == '#/registration' ) {
        this.showHeaderFooter = false;
      }
  });
  }

  ngOnInit() {
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

  // ngAfterViewInit(){
  //   setTimeout(() => {
  //     if (this.router.url == "/registration" || this.router.url == "/login") {
  //       this.showHeaderFooter = false;
  //     } else { this.showHeaderFooter = true; }
  //   }, 2);
   
  // }
}
