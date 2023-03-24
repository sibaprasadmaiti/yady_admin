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
  selector: 'app-promo-code-edit',
  templateUrl: './promo-code-edit.component.html',
  styleUrls: ['./promo-code-edit.component.scss']
})
export class PromoCodeEditComponent implements OnInit {
	
	public edit_id: any;
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	category_id_array:any = [];
	categoryData: any;
	isShown;
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
	country;
	state;
	city;
	subcategoryData: any;
	sub_category_id_array:any = [];
	isShown2;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { 
			  
				this.EditForm = formbuilder.group({
					zone_exclude_status: [''],
					promo_code: ['', Validators.compose([Validators.required])],
					discount_type: ['', Validators.compose([Validators.required])],
					amount: ['', Validators.compose([Validators.required])],
					no_of_use: ['', Validators.compose([Validators.required])],
					start_date: ['', Validators.compose([Validators.required])],
					end_date: ['', Validators.compose([Validators.required])],
					country_id: ['', Validators.compose([Validators.required])],
					state_id: ['', Validators.compose([Validators.required])],
					city_id: ['', Validators.compose([Validators.required])],
					},{validator: this.dateLessThan('start_date', 'end_date')});
			  
			  }

	ngOnInit() {
		this.categoryList();
		//this.subcategoryList();
		this.getCountryList();
		this.route.params.subscribe(params => {
			this.edit_id = params.id;
		});
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/promoCodeById/${this.edit_id}/?token=${this.logtoken}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			console.log(response.data);
			this.EditForm.patchValue({
				promo_code: response.data.promo_code,
				discount_type: response.data.discount_type,
				amount: response.data.amount,
				start_date: response.data.start_date,
				end_date: response.data.end_date,
				no_of_use: response.data.no_of_use,
				country_id: response.data.country_id,
				state_id: response.data.state_id,
				city_id: response.data.city_id,
				zone_exclude_status: response.data.zone_exclude_status,
			});
			this.category_id_array = response.data.category_ids;
			this.sub_category_id_array = response.data.sub_category_ids;
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
			this.getSubCatgories(this.category_id_array);
			
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
		if(this.category_id_array.length <= 0) {
			this.isShown = ! this.isShown;
			return false;
		}
		if(this.sub_category_id_array.length <= 0) {
			this.isShown2 = ! this.isShown2;
			return false;
		}
		this.spinnerService.show();
		const updatecontent = this.EditForm.value;
		updatecontent.promo_code_id = this.edit_id;
		updatecontent.category_ids = this.category_id_array;
		updatecontent.sub_category_ids = this.sub_category_id_array;
		if(updatecontent.zone_exclude_status == true) {
			updatecontent.zone_exclude_status = 1;
		} else {
			updatecontent.zone_exclude_status = 0;
		}
		//console.log(updatecontent); return false;
		this.adminservice.HttpPostReq(`admin/updatePromoCode?token=${this.logtoken}`, updatecontent, true)
		.then((response: any) => {
			if (response.success === true) {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
				this.router.navigateByUrl('/main/promo-code-list');
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
	
	categoryList() {
		var category_name = undefined;
		this.adminservice.HttpGetReq(`admin/getAllCategories?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.categoryData = response.data;
				console.log(this.categoryData);
				
			},
			(error) => {

			}
		);
	}
	subcategoryList() {
		var category_id = undefined;
		this.adminservice.HttpGetReq(`admin/getAllSubcategories?token=${this.logtoken}&category_id=${category_id}`, true)
		.then(
			(response: any) => {
				this.subcategoryData = response.data;
				console.log(this.subcategoryData);
				
			},
			(error) => {

			}
		);
	}
	
	send_category_id(event,category_id) {
		this.isShown = false;
		if(event.target.checked == true) {
			this.category_id_array.push(category_id);
		} else {
			var index = this.category_id_array.indexOf(category_id);
			if (index > -1) {
                this.category_id_array.splice(index, 1);
            }
		}
		//console.log(this.category_id_array);
		this.getSubCatgories(this.category_id_array);
	}
	send_sub_category_id(event,sub_category_id) {
		this.isShown = false;
		if(event.target.checked == true) {
			this.sub_category_id_array.push(sub_category_id);
		} else {
			var index = this.sub_category_id_array.indexOf(sub_category_id);
			if (index > -1) {
                this.sub_category_id_array.splice(index, 1);
            }
		}
		//console.log(this.category_id_array);
	}
	
	inputChecked(cat_id) {
		//console.log('cat_id',cat_id);
		//console.log('cat_id',this.category_id_array);
		let checked = false;
		for (let l = 0; l < this.category_id_array.length; l++) {
			let temp = this.category_id_array[l];
			//console.log('inside =',temp);
			if (temp == cat_id) {
				checked = true;    
			} 
		}
		return checked;
	}
	
	inputCheckedSubcat(sub_cat_id) {
		let checked = false;
		for (let l = 0; l < this.sub_category_id_array.length; l++) {
			let temp = this.sub_category_id_array[l];
			if (temp == sub_cat_id) {
				checked = true;    
			}
		}
		return checked;
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
	getSubCatgories(category_id_array) {
		this.adminservice.HttpGetReq(`admin/getSubcategoriesByCatId?token=${this.logtoken}&category_id_array=${category_id_array}`, true)
		.then(
			(response: any) => {
				this.subcategoryData = response.data;
			},
			(error) => {

			}
		);
	}

}
