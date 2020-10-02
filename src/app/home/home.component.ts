import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';

import { UtililtyFunctions } from 'src/app/utils/utils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMessage;


  public getImageValue;

  public TopNavImage = {
    image: ''
  }
  public WhatWeDo = {
    image: '',
    textHeading1: '',
  }
  public Services = {
    image1: '',
    image2: '',
    image3: '',
    image4: ''
  }

  public SpecialistClinic = {
    image1: '',
    image2: '',
    image3: ''

  }

  public webText = {
    TopNavFirstSectionFirstHeading: ' ',
    TopNavFirstSectionSecondHeading: ' ',
    TopNavSecondSectionFirstHeading: ' ',
    TopNavSecondSectionSecondHeading: ' ',
    TopNavSecondSectionThirdHeading: ' ',
    TopNavSecondSectionFourthHeading: ' ',
    TopNavThirdSectionFirstHeading: ' ',
    TopNavFourthSectionSecondHeading: ' ',
    WhatWeDoFirstHeading: ' ',
    WhatWeDoSecondHeading: ' ',
    WhatWeDoThirdHeading: ' ',
    WhatWeDoFourthHeading: ' ',
    WhatWeDoFirstImgHeading: ' ',
    WhatWeDoSecondImgHeading: ' ',
    WhatWeDoThirdImgHeading: ' ',
    WhatWeDoForthImgHeading: ' ',
    SpecialistImage1Heading1: ' ',
    SpecialistImage1Heading2: ' ',
    SpecialistImage1Heading3: ' ',
    SpecialistImage2Heading1: ' ',
    SpecialistImage2Heading2: ' ',
    SpecialistImage2Heading3: ' ',
    SpecialistImage3Heading1: ' ',
    SpecialistImage3Heading2: ' ',
    SpecialistImage3Heading3: ' ',
    FooterFisrtSectionHeading1: ' ',
    FooterSecondSectionHeading1: ' ',
    FooterSecondSectionHeading2: ' ',
    FooterSecondSectionHeading3: ' ',
    FooterSecondSectionHeading4: ' ',
    FooterThirdSectionHeading1: ' ',
    FooterThirdSectionHeading2: ' ',
  }

  constructor(private router: Router, private utilityservice: UtililtyFunctions, private _apiservice: APIService, private toastr: ToastrService) { }

  ngOnInit() {

    /*= text auto writer ==*/
    var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);


    this.Get_WebsiteImageByLocationEnumList(1);
    this.Get_WebsiteTextDataByLocationEnumList();
  }



  Get_WebsiteImageByLocationEnumList(val) {
    let dataobj = {
    };
    this._apiservice.Get_WebsiteImageByLocationEnumList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_ExpertiseListGet_ExpertiseList", data);
        for (var i = 0; i < data.length; i++) {
          if (data[i].image && data[i].image.data && data[i].image.data.data) {
            if (data[i].locationEnum == 1) {
              this.TopNavImage.image = this.arrayBufferToBase64(data[i].image.data.data);
            }
            if (data[i].locationEnum == 2) {
              this.WhatWeDo.image = this.arrayBufferToBase64(data[i].image.data.data);
            }
            if (data[i].locationEnum == 3) {
              this.Services.image1 = this.arrayBufferToBase64(data[i].image.data.data);
            }
            if (data[i].locationEnum == 4) {
              this.Services.image2 = this.arrayBufferToBase64(data[i].image.data.data);
            }
            if (data[i].locationEnum == 5) {
              this.Services.image3 = this.arrayBufferToBase64(data[i].image.data.data);
            }

            if (data[i].locationEnum == 6) {
              this.Services.image4 = this.arrayBufferToBase64(data[i].image.data.data);
            }
            if (data[i].locationEnum == 7) {
              this.SpecialistClinic.image1 = this.arrayBufferToBase64(data[i].image.data.data);
            }
            if (data[i].locationEnum == 8) {
              this.SpecialistClinic.image2 = this.arrayBufferToBase64(data[i].image.data.data);
            }
            if (data[i].locationEnum == 9) {
              this.SpecialistClinic.image3 = this.arrayBufferToBase64(data[i].image.data.data);
            }


          }
        }

        console.log("this.TopNavImage.imagethis.TopNavImage.image", this.TopNavImage.image);

        //  this.getImageValue ='';
        //  if(data.image!=undefined && data.image.data!=undefined)
        //  {
        //    this.getImageValue = this.arrayBufferToBase64(data.image.data.data);//need to update data in base 64
        //  }

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }




  Get_WebsiteTextDataByLocationEnumList() {
    let dataobj = {
    };
    this._apiservice.Get_WebsiteTextDataByLocationEnumList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_WebsiteTextDataByLocationEnumList", data);
        for (var i = 0; i < data.length; i++) {
          if (data[i].textData) {
            if (data[i].locationEnum == 1) {
              this.webText.TopNavFirstSectionFirstHeading = data[i].textData;
            }
            if (data[i].locationEnum == 2) {
              this.webText.TopNavFirstSectionSecondHeading = data[i].textData;
            }
            if (data[i].locationEnum == 3) {
              this.webText.TopNavSecondSectionFirstHeading = data[i].textData;
            }
            if (data[i].locationEnum == 4) {
              this.webText.TopNavSecondSectionSecondHeading = data[i].textData;
            }
            if (data[i].locationEnum == 5) {
              this.webText.TopNavSecondSectionThirdHeading = data[i].textData;
            }
            if (data[i].locationEnum == 6) {
              this.webText.TopNavSecondSectionFourthHeading = data[i].textData;
            }
            if (data[i].locationEnum == 7) {
              this.webText.TopNavThirdSectionFirstHeading = data[i].textData;
            }
            if (data[i].locationEnum == 8) {
              this.webText.TopNavFourthSectionSecondHeading = data[i].textData;
            }
            if (data[i].locationEnum == 9) {
              this.webText.WhatWeDoFirstHeading = data[i].textData;
            }
            if (data[i].locationEnum == 10) {
              this.webText.WhatWeDoSecondHeading = data[i].textData;
            }
            if (data[i].locationEnum == 11) {
              this.webText.WhatWeDoThirdHeading = data[i].textData;
            }
            if (data[i].locationEnum == 12) {

              this.webText.WhatWeDoFourthHeading = data[i].textData;
            }
            if (data[i].locationEnum == 13) {
              this.webText.WhatWeDoFirstImgHeading = data[i].textData;
            }
            if (data[i].locationEnum == 14) {
              this.webText.WhatWeDoSecondImgHeading = data[i].textData;
            }
            if (data[i].locationEnum == 15) {
              this.webText.WhatWeDoThirdImgHeading = data[i].textData;
            }
            if (data[i].locationEnum == 16) {
              this.webText.WhatWeDoForthImgHeading = data[i].textData;
            }
            if (data[i].locationEnum == 17) {
              this.webText.SpecialistImage1Heading1 = data[i].textData;
            }
            if (data[i].locationEnum == 18) {
              this.webText.SpecialistImage1Heading2 = data[i].textData;
            }
            if (data[i].locationEnum == 19) {
              this.webText.SpecialistImage1Heading3 = data[i].textData;
            }
            if (data[i].locationEnum == 20) {
              this.webText.SpecialistImage2Heading1 = data[i].textData;
            }
            if (data[i].locationEnum == 21) {
              this.webText.SpecialistImage2Heading2 = data[i].textData;
            }
            if (data[i].locationEnum == 22) {
              this.webText.SpecialistImage2Heading3 = data[i].textData;
            }
            if (data[i].locationEnum == 23) {
              this.webText.SpecialistImage3Heading1 = data[i].textData;
            }
            if (data[i].locationEnum == 24) {
              this.webText.SpecialistImage3Heading2 = data[i].textData;
            }
            if (data[i].locationEnum == 25) {
              this.webText.SpecialistImage3Heading3 = data[i].textData;
            }
            if (data[i].locationEnum == 26) {
              this.webText.FooterFisrtSectionHeading1 = data[i].textData;
            }
            if (data[i].locationEnum == 27) {
              this.webText.FooterSecondSectionHeading1 = data[i].textData;
            }
            if (data[i].locationEnum == 28) {
              this.webText.FooterSecondSectionHeading2 = data[i].textData;
            }
            if (data[i].locationEnum == 29) {
              this.webText.FooterSecondSectionHeading3 = data[i].textData;
            }
            if (data[i].locationEnum == 30) {
              this.webText.FooterSecondSectionHeading4 = data[i].textData;
            }
            if (data[i].locationEnum == 31) {
              this.webText.FooterThirdSectionHeading1 = data[i].textData;
            }
            if (data[i].locationEnum == 32) {
              this.webText.FooterThirdSectionHeading2 = data[i].textData;
            }

          }

        }
        console.log("this.TopNavImage.imagethis.TopNavImage.image", this.TopNavImage.image);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);

  }



}
