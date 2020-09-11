import { Injectable } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Injectable({
  providedIn: 'root'
})
export class GTMFunction {

  constructor(private gtmService: GoogleTagManagerService) { }

  pageview(page) {
   // console.log("this.gtmService", this.gtmService);
    this.gtmService.pushTag({ event: 'page', pageName: page });
  }

}
