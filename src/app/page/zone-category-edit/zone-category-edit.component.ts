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
  selector: 'app-zone-category-edit',
  templateUrl: './zone-category-edit.component.html',
  styleUrls: ['./zone-category-edit.component.scss']
})
export class ZoneCategoryEditComponent implements OnInit {
	
	public zone_cat_subcat_id: any;
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	subCategoryData: any = [];
	categoryData: any;
	sub_category_id: any;
	test_id: any;
	sub_category_id_array:any = [];
	zone_id;
	optionValue;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { 
			  
				this.EditForm = formbuilder.group({
					category_id: ['', Validators.compose([Validators.required])],
					zone_price_status: ['', Validators.compose([Validators.required])],
					price_percentage: [''],
					increase_decrease_status: [''],
				});
			  
			  
			  }

    ngOnInit() {
		this.route.params.subscribe(params => {
			this.zone_cat_subcat_id = params.zone_cat_subcat_id;
		});
		this.getCategoryList();
		this.getZoneCatSubcatDetails(this.zone_cat_subcat_id);
    }
	
	getZoneCatSubcatDetails(zone_cat_subcat_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getZoneCatSubcatDetails/?token=${this.logtoken}&zone_cat_subcat_id=${zone_cat_subcat_id}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			//console.log(response.data);
			this.EditForm.patchValue({
				category_id: response.data.cat_id,
				zone_price_status: response.data.zone_price_status,
				price_percentage: response.data.price_percentage,
				increase_decrease_status: response.data.increase_decrease_status,
			});
			this.onChangeCategory(response.data.cat_id);
			this.test_id = response.data.sub_cat_id;
			this.sub_category_id_array.push(response.data.sub_cat_id);
			this.zone_id = response.data.zone_id;
		},
		(error) => {
			this.spinnerService.hide();
				this.snackBar.open('Internal server error', 'End now', {
					duration: 5000,
				});
			}
		);
	}
	
	onChangeCategory(cat_id) {
		if(cat_id) {
			this.adminservice.HttpGetReq(`admin/getAllSubcategories?token=${this.logtoken}&category_id=${cat_id}`, true)
			.then(
				(response: any) => {
					if(response.success == true) {
						this.subCategoryData = response.data;
						//console.log(this.subCategoryData);
					} else {
						this.subCategoryData = [];
					}
				},
				(error) => {

				}
			);
		}
	}
	getCategoryList() {
		this.adminservice.HttpGetReq(`admin/getAllCategories?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.categoryData = response.data;
				//console.log(this.categoryData);
			},
			(error) => {

			}
		);
	}
	
	inputChecked(sub_cat_id) {
		//console.log('1',sub_cat_id);
		//console.log('2',this.test_id);
		if(sub_cat_id == this.test_id) {
			let checked = true;
			return checked;
		}
	}
	send_subcategory_id(event,sub_category_id) {
		if(event.target.checked == true) {
			this.sub_category_id_array.push(sub_category_id);
		} else {
			var index = this.sub_category_id_array.indexOf(sub_category_id);
			if (index > -1) {
                this.sub_category_id_array.splice(index, 1);
            }
		}
		//console.log(this.sub_category_id_array);
	}
	
	updateData() {
		if(this.subCategoryData.length > 0 && this.sub_category_id_array.length == 0)
		{
			alert('Please select a sub category');
			return false;
		}
		if(this.EditForm.value.zone_price_status == '2' && this.EditForm.value.price_percentage == '')
		{
			alert('Please insert price percentage value');
			return false;
		}
		if(this.EditForm.value.zone_price_status == '2' && this.EditForm.value.increase_decrease_status == '')
		{
			alert('Please select either increase or decrease');
			return false;
		}
		this.spinnerService.show();
		const editcontent = this.EditForm.value;
		editcontent.sub_category_id = this.sub_category_id_array;
		editcontent.zone_cat_subcat_id = this.zone_cat_subcat_id;
		editcontent.zone_id = this.zone_id;
		//console.log(editcontent);
		
		this.adminservice.HttpPostReq(`admin/updateZoneCatSubcat?token=${this.logtoken}`, editcontent, true)
		.then((response: any) => {
			if (response.success === true) {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
				this.router.navigateByUrl('/main/zone-category-price-list/'+this.zone_id);
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
