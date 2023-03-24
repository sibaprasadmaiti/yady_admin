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
  selector: 'app-holiday-edit',
  templateUrl: './holiday-edit.component.html',
  styleUrls: ['./holiday-edit.component.scss']
})
export class HolidayEditComponent implements OnInit {
	
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	holiday_id;
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
	country;
	state;
	city;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { 
			  
					this.EditForm = formbuilder.group({
						country_id: ['', Validators.compose([Validators.required])],
						state_id: ['',Validators.compose([Validators.required])],
						city_id: ['',Validators.compose([Validators.required])],
						holiday_name: ['',Validators.compose([Validators.required])],
						holiday_date: ['',Validators.compose([Validators.required])],
					});
			  }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.holiday_id = params.holiday_id;
		});
		this.getHolidayDetails(this.holiday_id);
		this.getCountryList();
	}
	
	getHolidayDetails(holiday_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getHolidayDetails/?token=${this.logtoken}&holiday_id=${holiday_id}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			console.log(response.data);
			
			this.EditForm.patchValue({
				country_id: response.data.country_id,
				state_id: response.data.state_id,
				city_id: response.data.city_id,
				holiday_name: response.data.holiday_name,
				holiday_date: response.data.holiday_date,
			});
			
			if(response.data.country != null) {
				this.country = response.data.country;
			} else {
				this.country = 'Select Country';
			}
			if(response.data.state != null) {
				this.state = response.data.state;
			} else {
				this.state = 'Select State';
			}
			if(response.data.city != null) {
				this.city = response.data.city;
			} else {
				this.city = 'Select City';
			}
			this.onChangeCountry(response.data.country_id);
			this.onChangeState(response.data.state_id);
		},
		(error) => {
			this.spinnerService.hide();
				this.snackBar.open('Internal server error', 'End now', {
					duration: 5000,
				});
			}
		);
	}
	getCountryList() {
		this.adminservice.HttpGetReq(`admin/getCountryList?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.countryData = response.data;
				//console.log(this.countryData);
			},
			(error) => {

			}
		);
	}
	onChangeCountry(countryId: number) {
		this.stateData = [];
		if(countryId) {
			this.spinnerService.show();
			this.adminservice.HttpGetReq(`admin/getStateList?token=${this.logtoken}&country_id=${countryId}`, true)
			.then(
				(response: any) => {
					this.stateData = response.data;
					//console.log(this.stateData);
					this.spinnerService.hide();
				},
				(error) => {
					this.spinnerService.hide();
				}
			);
		}
	}
	onChangeState(stateId: number) {
		this.cityData = [];
		if(stateId) {
			this.spinnerService.show();
			this.adminservice.HttpGetReq(`admin/getCityList?token=${this.logtoken}&state_id=${stateId}`, true)
			.then(
				(response: any) => {
					this.cityData = response.data;
					//console.log(this.stateData);
					this.spinnerService.hide();
				},
				(error) => {
					this.spinnerService.hide();
				}
			);
		}
	}
	
	updateData() {
		this.spinnerService.show();
		const updatecontent = this.EditForm.value;
		updatecontent.holiday_id = this.holiday_id;
		//console.log(new Date(updatecontent.holiday_date).toLocaleString());
		//console.log(updatecontent); return false;
		this.adminservice.HttpPostReq(`admin/updateHoliday?token=${this.logtoken}`, updatecontent, true)
			.then((response: any) => {
				if (response.success === true) {
					this.spinnerService.hide();
					this.toastr.success(response.message);
					this.router.navigateByUrl('/main/holiday-edit/'+this.holiday_id);
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
			}
		);
	}

}
