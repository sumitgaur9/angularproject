import { AbstractControl, ValidationErrors,FormControl} from '@angular/forms';
  
export class ContactValidator {
    static canZeroAtFirstSpace(control: AbstractControl) : ValidationErrors | null {
        if(control.value){
        if((control.value as string).length > 11 || (control.value as string).length < 9)
        {
            return {canZeroAtFirstSpace: true}
        }
        // else if((control.value as string).match(/^[1-9]{10}$/))
        else if((control.value as string).match(/^[1-9]\d{9}$/))
        {
            return null;
        } 
        else if((control.value as string).length == 11 && (control.value as string).match(/^[0]\d{10}$/))
        // else if((control.value as string).length == 11 && (control.value as string).match(/^(0)?[0-9]{10}$/))
        {
         return  null;
        }
        else{
            return {canZeroAtFirstSpace: true}
        }
    }
    else{
        return null;
    }
    }
}