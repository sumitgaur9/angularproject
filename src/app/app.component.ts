import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GTMFunction } from './utils/gtm';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'newProject';

  showHeaderFooter: boolean = true;

  constructor(private router: Router, private GTMFunction: GTMFunction) {
    router.events.subscribe((val) => {

      if(location.hash){
        console.log("this.router.url",location.hash);
        this.GTMFunction.pageview(location.hash);
      }
      this.showHeaderFooter = true;

      if (location.hash == '#/login' ||location.hash == '#/registration' ) {
        this.showHeaderFooter = false;
      }
  });
  }

  ngOnInit() {
    
  }

  // ngAfterViewInit(){
  //   setTimeout(() => {
  //     if (this.router.url == "/registration" || this.router.url == "/login") {
  //       this.showHeaderFooter = false;
  //     } else { this.showHeaderFooter = true; }
  //   }, 2);
   
  // }
}
