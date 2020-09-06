import { AbstractControl, FormGroup, FormControl, ValidatorFn } from '@angular/forms';

export function gstNoValidation(control: AbstractControl) {
  let regex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
  if (control.value != undefined && control.value != '' &&
  (regex.test(control.value.toUpperCase()) == false || parseInt(control.value.substr(0, 2)) > 35 || parseInt(control.value.substr(0, 2)) < 1)) {
    return { gstNoPattern: true };
  }
  return null;
}

export function panNoValidation(control: AbstractControl) {
  let regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (control.value != undefined && control.value != '' && regex.test(control.value.toUpperCase()) == false) {
    return { panNoPattern: true };
  }
  return null;
}

export function pincodeValidation(control: AbstractControl) {
  let regex = /([0-9]){6}$/;
  if (control.value != undefined && control.value != '' && regex.test(control.value.toUpperCase()) == false) {
    return { pincodePattern: true };
  }
  return null;
}

export function matches(
  targetKey: string,
  toMatchKey: string
): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {
    const target = group.controls[targetKey];
    const toMatch = group.controls[toMatchKey];
     group.markAllAsTouched();
    if (target.touched && toMatch.touched) {
      const isMatch = target.value === toMatch.value;
      // set equal value error on dirty controls
      if (!isMatch && target.valid && toMatch.valid) {

        toMatch.setErrors({ equalValue: targetKey });
        const message = targetKey + ' != ' + toMatchKey;
        return { equalValue: message };
      }
      if (isMatch && toMatch.hasError('equalValue')) {
        toMatch.setErrors(null);
      }
    }

    return null;
  };
}
