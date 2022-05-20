import { ValidatorFn, AbstractControl } from '@angular/forms';

import { FormControl, FormGroup } from '@angular/forms'

export function CustomRangeValidatorMin(controlName: string, min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.parent || !control) {
      return;
    }
    try {
      if (!control.value) {
        return;
      }
      if (control.value) {
        console.log("=Validation=value: "+control.value);
		//console.log("=Validation=message: "+control.validations.message);
        if (control.value < min) {
          return {minLengthExceeded: true};
        } else {
          return;
        }
      }
    } catch (e) {
      return;
    }
    return;
  };
}