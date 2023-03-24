import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-zone-category',
  templateUrl: './zone-category.component.html',
  styleUrls: ['./zone-category.component.scss']
})
export class ZoneCategoryComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	zoneCatForm: FormGroup;
	categoryData: any;
	zone_id;
	subCategoryData: any = [];
	optionValue;
	sub_category_id_array:any = [];

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder,public HttpClient: HttpClient) { 
	
		this.zoneCatForm = formbuilder.group({
			category_id: ['', Validators.compose([Validators.required])],
			price_percentage: [''],
			increase_decrease_status: [''],
			zone_price_status: ['', Validators.compose([Validators.required])], 
		});
	}

  ngOnInit() {
	this.route.params.subscribe(params => {
		this.zone_id = params.zone_id;
	});
	this.getCategoryList();
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
	
	onChangeCategory(cat_id) {
		if(cat_id) {
			this.adminservice.HttpGetReq(`admin/getAllSubcategories?token=${this.logtoken}&category_id=${cat_id}`, true)
			.then(
				(response: any) => {
					if(response.success == true) {
						this.subCategoryData = response.data;
					} else {
						this.subCategoryData = [];
					}
					console.log(this.subCategoryData);
				},
				(error) => {

				}
			);
		}
	}
	
	addZoneCatSubact() {
		//console.log(this.zoneCatForm.value);
		//console.log(this.subCategoryData.length); return false;
		if(this.subCategoryData.length > 0 && this.sub_category_id_array.length == 0)
		{
			alert('Please select a sub category');
			return false;
		}
		if(this.zoneCatForm.value.zone_price_status == '2' && this.zoneCatForm.value.price_percentage == '')
		{
			alert('Please insert price percentage value');
			return false;
		}
		if(this.zoneCatForm.value.zone_price_status == '2' && this.zoneCatForm.value.increase_decrease_status == '')
		{
			alert('Please select either increase or decrease');
			return false;
		}
		
		this.spinnerService.show();
		const addcontent = this.zoneCatForm.value;
		addcontent.zone_id = this.zone_id;
		addcontent.sub_category_id = this.sub_category_id_array;
		//console.log(addcontent); return false;
		this.adminservice.HttpPostReq(`admin/saveZoneCatSubcatPrice?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				this.zoneCatForm.reset();
				this.router.navigateByUrl('/main/zone-category-price-list/'+this.zone_id);
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
	
	zoneCatSubcatList() {
		this.router.navigateByUrl('/main/zone-category-price-list/'+this.zone_id);
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

}
