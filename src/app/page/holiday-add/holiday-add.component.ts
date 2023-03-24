import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-holiday-add',
  templateUrl: './holiday-add.component.html',
  styleUrls: ['./holiday-add.component.scss']
})
export class HolidayAddComponent implements OnInit {
	
	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) { 
	
		this.addForm = formbuilder.group({
			start_date: ['',Validators.compose([Validators.required])],
			end_date: ['',Validators.compose([Validators.required])],
			country_id: ['',Validators.compose([Validators.required])],
			state_id: ['',Validators.compose([Validators.required])],
			city_id: ['',Validators.compose([Validators.required])],
			holiday_name: ['',Validators.compose([Validators.required])],
		},{validator: this.dateLessThan('start_date', 'end_date')});
	}

  ngOnInit() {
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
	
	dateLessThan(from: string, to: string) {
		return (group: FormGroup): {[key: string]: any} => {
			let f = group.controls[from];
			let t = group.controls[to];
				if (f.value > t.value) {
					return {
						dates: "Date from should be less than Date to"
					};
				}
			return {};
		}
	}
	
	addData() {
		const addcontent = this.addForm.value;
		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/saveHoliday?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				this.router.navigateByUrl('/main/holiday-list');
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

}
