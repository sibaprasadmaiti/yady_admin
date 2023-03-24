import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-query-category-edit',
  templateUrl: './query-category-edit.component.html',
  styleUrls: ['./query-category-edit.component.scss']
})
export class QueryCategoryEditComponent implements OnInit {
	
	public edit_id: any;
	public addfaqcategory: any;
	category: any;
	EditForm: FormGroup;
	imgsrc: any;
	logtoken = localStorage.getItem('LoginToken');
	public imgpath: any;
	file: any;
	language: any;
	status: any;
	fixed_price_hour_div: any;
	timezoneData: any[] = [];
	price_status;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { 
			  
			  this.EditForm = formbuilder.group({
					category_name: [''],
					timezone_id: [''],
					status: [''],
			  });
			  
			  }

	ngOnInit() {
		this.getTimezoneList();
		this.route.params.subscribe(params => {
			this.edit_id = params.id;
		});
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/queryCategoryData/${this.edit_id}/?token=${this.logtoken}`, true)
		.then((response: any) => {
		  this.spinnerService.hide();
		  console.log('response.data',response.data);
		  this.EditForm.patchValue({
				category_name: response.data.category_name,
				status: response.data.status,
				timezone_id: response.data.timezone_id,
				time_interval: response.data.time_interval
			});
		},
	   (error) => {
		 this.spinnerService.hide();
		 this.snackBar.open('Internal server error', 'End now', {
		   duration: 5000,
		 });
	   });
	}
	getTimezoneList() {
		this.adminservice.HttpGetReq(`admin/getTimezoneList?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.timezoneData = response.data;
				//console.log(this.countryData);
			},
			(error) => {

			}
		);
	}
	updateData() {
		const updatecontent = this.EditForm.value;
		//console.log(updatecontent); return false;
		updatecontent.id = this.edit_id;
		const  form_data = new FormData();
		form_data.append('category_name', updatecontent.category_name);
		form_data.append('status', updatecontent.status);
		form_data.append('cat_id', updatecontent.id);
		form_data.append('timezone_id', updatecontent.timezone_id);
		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/updateQueryCategory?token=${this.logtoken}`, form_data, true)
		 .then((response: any) => {
		   if (response.success === true) {
			this.spinnerService.hide();
			this.snackBar.open(response.message, 'End now', {
			  duration: 5000,
			});
			this.router.navigateByUrl('/main/query-category-list');
		   } else {
			this.spinnerService.hide();
			this.snackBar.open(response.message, 'End now', {
			  duration: 5000,
			});
		   }
		 },
		(error) => {
		  this.spinnerService.hide();
		  this.snackBar.open('Internal server error', 'End now', {
			duration: 5000,
		  });
		});
	}
	backtolist() {
		this.router.navigateByUrl('/main/query-category-list');
	}

}
