import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {FormControl} from '@angular/forms';
import { PATTERN_ERROR_MESSAGE } from 'src/app/shared/api.constant'
import { AppEnum } from 'src/app/shared/app.enum';
import * as moment from 'moment';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class UtililtyFunctions {
    public onLoginSuccessfully: Subject<any> = new Subject<any>();
    public onLogoutSuccessfully: Subject<any> = new Subject<any>();
    public preparePaymentDetailsData: Subject<any> = new Subject<any>();
    public addIntoCart: Subject<any> = new Subject<any>();
    public fromRegPageSendDataToLogin: Subject<any> = new Subject<any>();


    isUserLoggedIn() {
        let loginedUserData = JSON.parse(window.sessionStorage.getItem("userToken"));  //need to do get current user data api need 
        if (loginedUserData && loginedUserData != null) {
            return loginedUserData;
        }
        return false;
    }

    isUserTokenPresent(){
        let userToken = JSON.parse(window.sessionStorage.getItem("userToken"));
        if (userToken && userToken != null) {
            return userToken;
        }
        return false;
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    
      arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/jpg;base64,' + window.btoa(binary);
      }

      getErrorMessage(fieldControl: FormControl, formControlName, displayName: string) {
        //console.log(fieldControl,displayName);
        //  console.log(fieldControl.errors);
        if (fieldControl.errors) {
    
          if (fieldControl.errors.required && displayName) {
            return displayName + ' is mandatory';
          }
          else if (fieldControl.errors.pattern) {
            return this.checkPattern(formControlName);
          }
          else if (fieldControl.errors.minlength) {
            return 'Minimum length should be ' + fieldControl.errors.minlength.requiredLength + ' characters.';
          }
          else if (fieldControl.errors.maxlength) {
            return 'Maximum length should be ' + fieldControl.errors.maxlength.requiredLength + ' characters.';
          }
          else if (fieldControl.errors.notUnique) {
            return displayName + ' already exist';
          }
          else if (fieldControl.errors.invalidEntry || fieldControl.errors.notFound) {
            return displayName + ' not found';
          }
          else if (fieldControl.errors.invalidValue) {
            return 'should be less than 60 minutes';
          } else if (fieldControl.errors.matDatepickerMin) {
            return `${displayName} should not be beyond ${this.parsedDate(fieldControl.errors.matDatepickerMin.min)}`;
          }
          else if (fieldControl.errors.serverError) {
            return fieldControl.errors.serverError.toString();
          }
          else if (fieldControl.errors.passwordMismatch) {
            return 'Password and confirm password should be same.';
          }
          else if (fieldControl.errors['unique']) {
            return fieldControl.errors['unique']['message'];
          }
          else if (fieldControl.errors.isNegative) {
            return `${displayName} should not be less than 0`;
          }
        }
      }


      private parsedDate(dateValue) {
        const date = new Date(dateValue);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      }

      checkPattern(formControlName) {
        switch (formControlName) {
          case 'password': return PATTERN_ERROR_MESSAGE.password;
          case 'billingRate': return PATTERN_ERROR_MESSAGE.billingRate;
          case 'email': return PATTERN_ERROR_MESSAGE.email;
          case 'companyId': return PATTERN_ERROR_MESSAGE.companyId;
          case 'companyAdminUserId': return PATTERN_ERROR_MESSAGE.companyAdminUserId;
          case 'storeName': return PATTERN_ERROR_MESSAGE.storeName;
          case 'storeCode': return PATTERN_ERROR_MESSAGE.storeCode;
          case 'lname': return PATTERN_ERROR_MESSAGE.lastName;
          case 'fname': return PATTERN_ERROR_MESSAGE.firstName;
          case 'contactPerson1Name':
          case 'contactPerson2Name':
            return PATTERN_ERROR_MESSAGE.name;
          case 'contactPerson1Email':
          case 'contactPerson2Email':
            return PATTERN_ERROR_MESSAGE.email;
          case 'gstNo': return PATTERN_ERROR_MESSAGE.gstNo;
          case 'panNo': return PATTERN_ERROR_MESSAGE.panNo;
          case 'phoneno': return PATTERN_ERROR_MESSAGE.phoneno;

        }
      }
      defaultDateDBFormat() {
        return "1753-01-01 00:00:00";
      }

      ToDBDateFormat(input) {
        if (input) {
          if (input.length == 10) {
            var dt = moment(input, 'DD/MM/YYYY').format('YYYY/MM/DD');
            return dt;
          }
        }
        if (this.isAbValidDate(input) == false) {
          return this.defaultDateDBFormat();
        }
        if (input) {
          var result = new Date(input);
          if (result) {
            return this.ToSpecificDateFormat(result, AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS);
          }
        }
        return this.ToSpecificDateFormat(this.defaultDateDBFormat(), AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS);
      }
    
      defaultDateDispFormat() {
        return "01/01/1753";
      }


      ToDisplayDateFormat(input) {
        if (this.isAbValidDate(input) == false) {
            return this.defaultDateDispFormat();//change 4/24/2017 for financial period
        }
        input = new Date(input);
        if (input.length == 19) {
            var dt1 = moment(input).add(0, 'day').format('L')
            if (this.isAbValidDate(dt1)) {
                return this.ToSpecificDateFormat(dt1, AppEnum.AbDateTimeType.DD_MM_YYYY);
            }
        }
        var result = new Date(input);
        if (result) {
            return this.ToSpecificDateFormat(result, AppEnum.AbDateTimeType.DD_MM_YYYY);
        }

        return this.ToSpecificDateFormat(this.defaultDateDispFormat(), AppEnum.AbDateTimeType.DD_MM_YYYY);
    } //OK
    
    
      ToSpecificDateFormat(input, format) {
        var result = input;
        try {
          switch (format) {
            case AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS:
              result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
              break;
            case AppEnum.AbDateTimeType.MM_DD_YYYY_HH_mm_ss:
              result = moment(input, 'DD/MM/YYYY').format('DD/MM/YYYY');
              break;
            case AppEnum.AbDateTimeType.DD_MM_YYYY:
              result = moment(input, 'DD/MM/YYYY').format('DD/MM/YYYY');
              break;
            case AppEnum.AbDateTimeType.DD_MM_YY:
              result = moment(input, 'DD/MM/YYYY').format('dd/MM/yy');
              break;
            case AppEnum.AbDateTimeType.MM_DD_YYYY:
              result = moment(input, 'DD/MM/YYYY').format('MM/dd/yyyy');
              break;
            case AppEnum.AbDateTimeType.YYYY_MM_DD:
              result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
              break;
    
          }
        }
        catch (err) {
          result = this.defaultDateDispFormat();
        }
        return result;
      }
    
      isAbValidDate(input) {
        //if ((new Date(input) != "Invalid Date") && !isNaN(new Date(input))) {  // to be correct
        if (input != '') {
    
          if (input == '1753-01-01 00:00:00') {
            return false;
          }
          if (new Date(input).getMonth() != undefined) {
            return true;
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }
      }
}