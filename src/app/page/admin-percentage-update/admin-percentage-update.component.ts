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
  selector: 'app-admin-percentage-update',
  templateUrl: './admin-percentage-update.component.html',
  styleUrls: ['./admin-percentage-update.component.scss']
})
export class AdminPercentageUpdateComponent implements OnInit {
	
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	admin_percentage_id;
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
						hourly_service_percentage: ['',Validators.compose([Validators.required])],
						fixed_service_percentage: ['',Validators.compose([Validators.required])],
						query_service_percentage: ['',Validators.compose([Validators.required])],
					});
			  
			  }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.admin_percentage_id = params.admin_percentage_id;
		});
		this.getPercentageDetails(this.admin_percentage_id);
		this.getCountryList();
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
	getPercentageDetails(admin_percentage_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getAdminPercentageDetails/?token=${this.logtoken}&admin_percentage_id=${admin_percentage_id}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			console.log(response.data);
			
			this.EditForm.patchValue({
				country_id: response.data.country_id,
				state_id: response.data.state_id,
				city_id: response.data.city_id,
				hourly_service_percentage: response.data.hourly_service_percentage,
				fixed_service_percentage: response.data.fixed_service_percentage,
				query_service_percentage: response.data.query_service_percentage,
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
	
	updateData() {
		this.spinnerService.show();
		const updatecontent = this.EditForm.value;
		updatecontent.admin_percentage_id = this.admin_percentage_id;
		this.adminservice.HttpPostReq(`admin/updateAdminPercentage?token=${this.logtoken}`, updatecontent, true)
			.then((response: any) => {
				if (response.success === true) {
					this.spinnerService.hide();
					this.toastr.success(response.message);
					this.router.navigateByUrl('/main/admin-percentage-edit/'+this.admin_percentage_id);
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
