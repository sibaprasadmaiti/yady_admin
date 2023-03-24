import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';

@Component({
  selector: 'app-global-tax',
  templateUrl: './global-tax.component.html',
  styleUrls: ['./global-tax.component.scss']
})
export class GlobalTaxComponent implements OnInit {
	
	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];

  constructor(public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) { 
	
	this.addForm = formbuilder.group({
			country_id: ['', Validators.compose([Validators.required])],
			state_id: ['', Validators.compose([Validators.required])],
			city_id: ['', Validators.compose([Validators.required])],
			tax_percentage: ['', Validators.compose([Validators.required])],
        });
	
	
	}

  ngOnInit() {
	  this.getCountryList();
  }
  
	getCountryList() {
		this.adminservice.HttpGetReq(`admin/getCountryList?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.countryData = response.data;
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
					this.spinnerService.hide();
				},
				(error) => {
					this.spinnerService.hide();
				}
			);
		}
	}
	addTax(){
		const addcontent = this.addForm.value;
		if(addcontent.country_id == "") {
		  alert('Please select country');
		  return false;
		}
		if(addcontent.state_id == "") {
		  alert('Please select state');
		  return false;
		}
		if(addcontent.city_id == "") {
		  alert('Please select city');
		  return false;
		}
		if(addcontent.tax_percentage == "") {
		  alert('Please enter tax percentage');
		  return false;
		}
    
		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/saveTax?token=${this.logtoken}`, addcontent, true)
		.then(
		  (response: any) => {
				if(response.success == true) {
					this.spinnerService.hide();
					this.toastr.success(response.message);
					//this.router.navigateByUrl('/main/banner-management-list');
				} else {
					this.spinnerService.hide();
					this.toastr.error(response.message);
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
	
	backtolist(){
		this.router.navigateByUrl('/main/tax-list');
	}

}
