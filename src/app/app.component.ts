import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'newProject';

  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
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
