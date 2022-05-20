import {Component, Inject, Input,OnInit,ViewChild,ViewChildren,OnDestroy,AfterViewInit,AfterContentChecked,ChangeDetectorRef,  ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ReportDirective } from '../shared/report.directive';
import { ReportService } from '../shared/report.service';
import {ReportItem } from '../shared/report.item';

import {FormSchemaService} from '../FormSchemaService';
import { DynamicFormComponent } from '../../ui-elements/dynamic-control/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../ui-elements/dynamic-control/models/field-config.interface';
import { Validators } from '@angular/forms';
//https://stackoverflow.com/questions/47546831/form-io-not-rendering-custom-component
@Component({
	selector: 'app-filter',
    styleUrls: ['filter.component.scss'],
	templateUrl: './filter.component.html'  
})
export class FilterComponent implements OnInit,AfterViewInit{	
	@Input() public label: string;
	@ViewChild(DynamicFormComponent) form: DynamicFormComponent;
	config: FieldConfig[];	
	ngOnInit(): void {
		console.log("identity init started identity");	
		console.log("label received_1: "+this.label);	
	}
 
	constructor(
		private reportService: ReportService,
		private cdref: ChangeDetectorRef,
		private schemaService: FormSchemaService

	) {}
	
	ngAfterViewInit() {
		if(this.form.controls.length <1){
			console.log("dont have controls");
		}else{
			console.log("more");
		}
		console.log("label received_3: "+this.label);		
		console.log("ngAfterViewInit started");
		let previousValid = this.form.valid;
		this.form.changes.subscribe(() => {
		if (this.form.valid !== previousValid) {
			previousValid = this.form.valid;
			this.form.setDisabled('submit', !previousValid);
		}
		});

		this.form.setDisabled('submit', true);
		//this.form.setValue('name', '
		//');
		this.cdref.detectChanges();
		console.log("ngAfterViewInit finished");
	}
	ngAfterContentChecked(){
		console.log("ngAfterContentChecked started");
		if(this.label=="1"){		
			console.log("Report with id = 1 was requested" );
		}
		const sub$ = this.schemaService.getFormSchema().subscribe(data => {
		  this.config =data;
		  //console.log("data: "+data[0].type);
		  //sub$.unsubscribe();
		});
		sub$.unsubscribe();
		if(this.form.controls.length <1){
			console.log("dont have controls");		
		}else{	
		
		}    
		//console.log("label received_2: "+this.label);		
		console.log("ngAfterContentChecked finished");
	}
	submit(value: {[name: string]: any}) {
		console.log(value);
	}
}