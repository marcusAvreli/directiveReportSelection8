import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../dynamic-control/models/field.interface';
import { FieldConfig } from '../dynamic-control/models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: 
  /*`
    <div 
      class="dynamic-field form-input" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <input
        type="text"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name">
		 
	<ng-container *ngFor="let validation of field.validations;" >
<div *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</div>
</ng-container>
    </div>
	 
	
  `*/
  `
   <label>{{ config.label }}</label>
  <mat-form-field class="demo-full-width" [formGroup]="group">
<input matInput [formControlName]="config.name" [attr.placeholder]="config.placeholder" [type]="config.inputType">
 <mat-error *ngIf="group.controls[config.name].invalid ">
  <span *ngIf="group.controls[config.name].errors.minLengthExceeded">
                  
					  {{config.validations[0].message}}
					        

                </span>
 </mat-error>
<!--ng-container *ngFor="let validation of config.validations;" >

 <div ngIf="group.controls[config.name].errors.minLengthExceeded">
                  
                
      {{ validation.message }}

 </div>

</ng-container-->
</mat-form-field>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
