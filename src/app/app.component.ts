import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'newProject';

  showHeaderFooter: boolean = true;


  constructor(private router: Router) {

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    if (this.router.url == "/#/registration" || this.router.url == "/#/login") {
      this.showHeaderFooter = false;
    } else { this.showHeaderFooter = true; }
  }
}
