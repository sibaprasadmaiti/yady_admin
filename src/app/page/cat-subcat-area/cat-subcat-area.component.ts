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
  selector: 'app-cat-subcat-area',
  templateUrl: './cat-subcat-area.component.html',
  styleUrls: ['./cat-subcat-area.component.scss']
})
export class CatSubcatAreaComponent implements OnInit {
	
	areaAddForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
	city_name: any;
	lattitude: any;
	longitude: any;
	cat_id;
	subcat_id;
	
	view_port_northeast_lat: any;
	view_port_northeast_lng: any;
	view_port_southwest_lat: any;
	view_port_southwest_lng: any;
	areaDetails;
	country;
	state;
	city;
	currecnyData: any[] = [];

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder,public HttpClient: HttpClient) { 
	
		this.areaAddForm = formbuilder.group({
			country_id: [''],
			state_id: [''],
			city_id: [''],
			currency: [''],
		});
	
	
	}

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.cat_id = params.cat_id;
			this.subcat_id = params.subcat_id;
		});
	  //console.log('z',this.subcat_id);
	  this.getCountryList();
	  this.getCatSubcatArea(this.cat_id,this.subcat_id);
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
			this.adminservice.HttpGetReq(`admin/getCurrencyByCountry?token=${this.logtoken}&country_id=${countryId}`, true)
			.then(
				(response: any) => {
					this.currecnyData = response.data;
					//console.log(this.currecnyData);
					this.areaAddForm.patchValue({
						currency: response.data.currency_code,
					});
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
	onChangeCity(city_id) {
		if(city_id) {
			this.spinnerService.show();
			this.adminservice.HttpGetReq(`admin/getCityName?token=${this.logtoken}&city_id=${city_id}`, true)
			.then(
				(response: any) => {
					this.city_name = response.data.name;
					console.log(this.city_name);
						
						this.adminservice.HttpGetReq2('https://maps.googleapis.com/maps/api/geocode/json?address='+this.city_name+'&key=AIzaSyA-D0BU9p64xEqJI6pQOGguMoPV5NTJ6T4', true)
						.then(
							(response: any) => {
								console.log('aaa',response.results[0].geometry.viewport);
								this.lattitude = response.results[0].geometry.location.lat;
								this.longitude = response.results[0].geometry.location.lng;
								
								this.view_port_northeast_lat = response.results[0].geometry.viewport.northeast.lat;
								this.view_port_northeast_lng = response.results[0].geometry.viewport.northeast.lng;
								
								this.view_port_southwest_lat = response.results[0].geometry.viewport.southwest.lat;
								this.view_port_southwest_lng = response.results[0].geometry.viewport.southwest.lng;
								this.spinnerService.hide();
							},
							(error) => {
								this.spinnerService.hide();
							}
						);
				},
				(error) => {

				}
			);
		}
	}
	
	addArea() {
		const addcontent = this.areaAddForm.value;
		if(addcontent.country_id == '') {
			alert('Please select country');
			return false;
		}
		if(addcontent.state_id == '') {
			alert('Please select state');
			return false;
		}
		if(addcontent.city_id == '') {
			alert('Please select city');
			return false;
		}
		if(addcontent.currency == '') {
			alert('Currecny not selected');
			return false;
		}
		addcontent.lattitude = (<HTMLInputElement>document.getElementById('lat')).value;
		addcontent.longitude = (<HTMLInputElement>document.getElementById('long')).value;
		
		addcontent.view_port_northeast_lat = (<HTMLInputElement>document.getElementById('view_port_northeast_lat')).value;
		addcontent.view_port_northeast_lng = (<HTMLInputElement>document.getElementById('view_port_northeast_lng')).value;
		addcontent.view_port_southwest_lat = (<HTMLInputElement>document.getElementById('view_port_southwest_lat')).value;
		addcontent.view_port_southwest_lng = (<HTMLInputElement>document.getElementById('view_port_southwest_lng')).value;
		addcontent.category_id = this.cat_id;
		if(this.subcat_id == 'none') {
			addcontent.sub_category_id = '';
		} else {
			addcontent.sub_category_id = this.subcat_id;
		}
		//console.log(addcontent); return false;
		this.spinnerService.show();
		
		this.adminservice.HttpPostReq(`admin/saveCatSubcatArea?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				console.log('x',response.data);
				this.router.navigateByUrl('/main/cat-subcat-area-places/'+response.data._id);
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
	
	back() {
		if(this.subcat_id == 'none') {
			this.router.navigateByUrl('/main/category-list');
		} else {
			this.router.navigateByUrl('/main/sub-category-list/'+this.cat_id);
		}
	}
	
	getCatSubcatArea(cat_id,subcat_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/catSubcatArea/${this.cat_id}/${this.subcat_id}?token=${this.logtoken}`, true)
		.then((response: any) => {
			if(response.success == true) {
				this.spinnerService.hide();
				this.areaDetails = response.data;
				console.log('area',this.areaDetails);
				this.areaAddForm.patchValue({
					country_id: response.data.country_id,
					state_id: response.data.state_id,
					city_id: response.data.city_id
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
					this.lattitude = response.data.city_lat;
					this.longitude = response.data.city_long;
					this.view_port_northeast_lat = response.data.view_port_northeast_lat;
					this.view_port_northeast_lng = response.data.view_port_northeast_lng;
					this.view_port_southwest_lat = response.data.view_port_southwest_lat;
					this.view_port_southwest_lng = response.data.view_port_southwest_lng;
				} else {
					this.city = 'Select City';
				}
				this.onChangeCountry(response.data.country_id);
				this.onChangeState(response.data.state_id);
			} else {
				this.country = 'Select Country';
				this.state = 'Select State';
				this.city = 'Select City';
				this.spinnerService.hide();
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
