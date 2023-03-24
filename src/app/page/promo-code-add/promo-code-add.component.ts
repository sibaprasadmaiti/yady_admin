import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-promo-code-add',
  templateUrl: './promo-code-add.component.html',
  styleUrls: ['./promo-code-add.component.scss']
})
export class PromoCodeAddComponent implements OnInit {
	
	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	categoryData: any;
	category_id_array:any = [];
	isShown;
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
	subcategoryData: any;
	sub_category_id_array:any = [];
	isShown2;
	exclude_array:any = [];

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) {
		
		this.addForm = formbuilder.group({
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
  
	addData() {
		if(this.category_id_array.length <= 0) {
			this.isShown = ! this.isShown;
			return false;
		}
		if(this.sub_category_id_array.length <= 0) {
			this.isShown2 = ! this.isShown2;
			return false;
		}
		this.spinnerService.show();
		const addcontent = this.addForm.value;
		addcontent.category_ids = this.category_id_array;
		addcontent.sub_category_ids = this.sub_category_id_array;
		if(addcontent.zone_exclude_status == true) {
			addcontent.zone_exclude_status = 1;
		} else {
			addcontent.zone_exclude_status = 0;
		}
		//console.log(addcontent.zone_exclude_status);
		//console.log(addcontent); return false;
		this.adminservice.HttpPostReq(`admin/savePromoCode?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				this.router.navigateByUrl('/main/promo-code-list');
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
			//console.log('c',category_id);
			//var zs = <HTMLInputElement>document.getElementById("zz");
			//console.log('zs',zs);
			//console.log('zsx',zs.value);
			//if(category_id == zs.value) {
				//console.log('zzzzzzzzz');
				//const ele = <HTMLInputElement>document.getElementById("zz");
				//console.log(ele);
				//ele.checked = false;
			//}
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
		//console.log('s',this.sub_category_id_array);
	}
	
	getSubCatgories(category_id_array) {
		this.adminservice.HttpGetReq(`admin/getSubcategoriesByCatId?token=${this.logtoken}&category_id_array=${category_id_array}`, true)
		.then(
			(response: any) => {
				this.subcategoryData = response.data;
				//this.exclude_array = [];
				//if(this.subcategoryData.length > 0) {
					//for(var i = 0; i < this.subcategoryData.length; i++) {
						//console.log(this.subcategoryData[i]._id);
						//this.exclude_array.push(this.subcategoryData[i]._id);
						//this.sub_category_id_array.push(this.subcategoryData[i]._id);
					//}
				//}
			},
			(error) => {

			}
		);
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

}
