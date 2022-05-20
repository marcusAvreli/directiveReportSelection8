import { Component, EventEmitter, Input, OnChanges, OnInit, Output,Optional,Inject } from '@angular/core';
import { FormGroup, FormBuilder,ValidatorFn,Validators ,NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR,AbstractControl} from '@angular/forms';
import {ValidationService} from '../../../../core/services/validation.service';
import { FieldConfig ,Validator} from '../../models/field-config.interface';
import {UIElementBase} from '../../../ui-element-base';
import {CustomRangeValidatorMin} from '../../../../report-reader/validator';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  /*
  template: `
    <form
      class="dynamic-form"
      [formGroup]="form"
      (submit)="handleSubmit($event)">
      <ng-container
        *ngFor="let field of config;"
        dynamicField
        [config]="field"
        [group]="form">
      </ng-container>
    </form>
  `
  */
  template: `
    <form
      class="dynamic-form"
      [formGroup]="form"
      (submit)="handleSubmit($event)">
	  
      <ng-container>
<table class="table">
  
      <tbody>
        <tr>
            <th  *ngFor="let field of config;"         dynamicField        [config]="field"         [group]="form"></th>
        </tr>
      </tbody>
</table>	</ng-container> 

  </form>
  
  `
})
export class DynamicFormComponent implements  /*OnChanges,*/ OnInit {
//export class DynamicFormComponent extends UIElementBase<string> implements  OnChanges, OnInit {
  @Input()
  config: FieldConfig[] = [];

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder
  //,@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    //          @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
      //        validationService: ValidationService
  
  ) {
	  //super(validators, asyncValidators, validationService);
	     // this.form.valueChanges.subscribe(_ => console.log(this.form));

  }/*
  already exists in value-accessor
registerOnChange(fn: any): void {
	console.log("Register_on_change");
    this.form.valueChanges.subscribe(values => fn(values));
  }*/
  ngOnInit() {
   // this.form = this.createGroup();
   this.form = this.createControl();
  }

 /* ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }*/
    registerOnTouched(fn: any): void {}

/*  validate(c: FormControl) {
    if (this.form.valid === false) {
      if (this.form.controls["firstName"].errors) {
        return { firstName: this.form.controls["firstName"].errors };
      }
    }

    return null;
  }*/

  /*createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }*/
   createControl() {
    const group = this.fb.group({});
    this.config.forEach(field => {
      if (field.type === "button") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [],field)
      );
      group.addControl(field.name, control);
    });
    return group;
  }


  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable': 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }
   private checkConfirmPassword(group: FormGroup) {
    
  }
   /*private bindValidations(validations: Validator[]): ValidatorFn {
        if (validations.length == 0)
            return null;
        const validList = [];
        validations.forEach((valid: Validator) => {
            validList.push(valid.validator)
        });
        return Validators.compose(validList);
    }*/
	private  bindValidations(validations: any[], field: any)  {
    if (validations.length > 0) {
      const validators = [];
	  
      validations.forEach(validation => {
		//validators.push(validation);  
		validators.push(validation.validator);  
       // switch (validation.name) {
        //  case 'required':
			console.log("=============Validation name:"+validation.message);
			//console.log("=============Validation label:"+field.label);
			//console.log("=============Validation name:"+field.name);
            //validators.push(CustomRangeValidatorMin(field.label, 1));
            //break;
         /* case 'minLength':
            validators.push(CustomRangeValidatorMin(field.label, field.min));
            break;
          case 'maxLength':
            validators.push(CustomRangeValidatorMax(field.label, field.max));
            break;
          case 'pattern':
            validators.push(Validators.pattern(validation.Expression));
            break;
          case 'inputType':
            validators.push(CustomInputType(field.inputType));
            break;*/
       // }
      });
      //return validators;
	        return Validators.compose(validators)

    }
    return null;
  }
	/*
 static NoNegativeNumbers(control: AbstractControl) {
  return control.value < 0 ? { negativeNumber: true } : null;
}
*/
}

