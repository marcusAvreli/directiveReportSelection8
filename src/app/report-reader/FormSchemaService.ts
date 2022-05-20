import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
//import {  regexValidator} from './validator';
import "rxjs/add/operator/delay";
import "rxjs/add/observable/of";
import { FieldConfig } from '../ui-elements/dynamic-control/models/field-config.interface';
import { Validators } from '@angular/forms';
import {CustomRangeValidatorMin} from './validator';
//https://stackoverflow.com/questions/47546831/form-io-not-rendering-custom-component
//https://github.com/kush-xerovit/Angular-Firebase-Project-Skeleton/blob/7018a32a470ee36a33852f512bec8bd0416dfe75/src/app/shared/services/form/form.service.ts#L111
const config: FieldConfig[] =   
	[
		/*{
			type: 'select',
			label: 'Favourite Food',
			name: 'food',
			options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
			placeholder: 'Select an option'
		},*/
		{
		  type: 'input',
		  label: 'Full name',
		  name: 'name',
		  placeholder: 'Enter your name another choise',
		 // validation: [Validators.required, Validators.minLength(4)]
		// validation: [Validators.required, this.customValidator.patternValidator()]
		 //validations :[ Validators.required, regexValidator(/^\d+$/)],
		 validations :  [
        {
          name: "required",
          validator: CustomRangeValidatorMin(this,1),
          message: "Validation Failed"
        }],
		 // ['', [Validators.required, Validators.email]],
		        //{ validator: [this.checkConfirmPassword] }

		},
		{
		  type: 'input',
		  label: 'Full name2',
		  name: 'name2',
		  placeholder: 'Enter your name another choise',
		 // validation: [Validators.required, Validators.minLength(4)]
		// validation: [Validators.required, this.customValidator.patternValidator()]
		 //validations :[ Validators.required, regexValidator(/^\d+$/)],
		 validations :  [
        {
          name: "required",
          validator: CustomRangeValidatorMin(this,1),
          message: "Validation Failed2"
        }],
		 // ['', [Validators.required, Validators.email]],
		        //{ validator: [this.checkConfirmPassword] }

		},
		/*{
      label: 'Submit',
      name: 'submit',
      type: 'button',
    },*/
	];


@Injectable()
export class FormSchemaService {
  constructor() {}
  public getFormSchema(): Observable<any> {
    //return Observable.of(config).delay(1000);
	return Observable.of(config);
  }
  private checkConfirmPassword() {
    
  }
}