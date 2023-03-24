import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-percentage-list',
  templateUrl: './admin-percentage-list.component.html',
  styleUrls: ['./admin-percentage-list.component.scss']
})
export class AdminPercentageListComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	showColor = false;
	showInfo = false;
	percentageData: any;
	searchForm: FormGroup;
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
	city_id = "";
	state_id = "";
	country_id = "";

  constructor(public adminservice: ApiServiceService,
              private router: Router,
              public formbuilder: FormBuilder,
              public toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) { 
			  
				this.searchForm = formbuilder.group({
					country_id: [''],
					state_id: [''],
					city_id: [''],
				});
			  
			  }

	ngOnInit() {
		this.getCountryList();
		this.adminPercentageList();
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
		//console.log('x',countryId);
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
		//console.log('x',stateId);
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
	adminPercentageList() {
		//this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/adminPercentageList/?token=${this.logtoken}&country_id=${this.country_id}&state_id=${this.state_id}&city_id=${this.city_id}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.percentageData = response.data;
					console.log('this.percentageData',this.percentageData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.percentageData = [];
					this.spinnerService.hide();
					this.toastr.success(response.message);
				}
			},
				(error) => {
					this.spinnerService.hide();
					this.toastr.error('Internal server error');
					this.snackBar.open('Internal server error', 'End now', {
					duration: 5000,
				});
			}
		);
	}
	editPercentage(admin_percentage_id) {
		this.router.navigateByUrl('/main/admin-percentage-edit/'+admin_percentage_id);
	}
	addNew() {
		this.router.navigateByUrl('/main/admin-percentage-add');
	}

}
