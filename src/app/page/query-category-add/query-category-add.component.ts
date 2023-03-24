import { AfterViewInit, Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
declare var google;

@Component({
  selector: 'app-query-category-add',
  templateUrl: './query-category-add.component.html',
  styleUrls: ['./query-category-add.component.scss']
})
export class QueryCategoryAddComponent implements OnInit {
	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	addcontent: any;
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
	city_name: any;
	lattitude: any;
	longitude: any;
	view_port_northeast_lat: any;
	view_port_northeast_lng: any;
	view_port_southwest_lat: any;
	view_port_southwest_lng: any;
	@ViewChild('area',{static:true}) input: ElementRef<HTMLInputElement>;
	areaArr:any = [];
	unique_area_arr:any = [];
	googlePlaceIdArr:any = [];
	unique_googlePlaceIdArr:any = [];
	lat_array:any = [];
	unique_lat_array:any = [];
	lng_array:any = [];
	unique_lng_array:any = [];
	timezoneData: any[] = [];
	currecnyData: any[] = [];
	timezoneDetails: any;
	

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
			category_name: [''],
			timezone_id: [''],
			currency: [''],
			area: [''],
      });
	
	
	}
	
	ngAfterViewInit(): void {
		//console.log('1');
    }

	ngOnInit() {
		this.getCountryList();
		this.getTimezoneList();
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
	getTimezoneList() {
		this.adminservice.HttpGetReq(`admin/getTimezoneList?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.timezoneData = response.data;
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
					this.addForm.patchValue({
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
								this.getAddressDetails();
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
	getAddressDetails() {
		//console.log('here');
		console.log('b',this.view_port_southwest_lat);
		
		var areaBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(this.view_port_southwest_lat, this.view_port_southwest_lng),
			new google.maps.LatLng(this.view_port_northeast_lat, this.view_port_northeast_lng)
		);

		const options = {
			types: ['geocode'],
			bounds: areaBounds,
			strictBounds: true,
			//radius: 500,
			//strictbounds: true
		};
		const autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, options);
		google.maps.event.addListener(autocomplete, 'place_changed', ()=> {
			var place = autocomplete.getPlace();
			console.log('place',place.geometry.location.lat());
			(<HTMLInputElement>document.getElementById('place_id')).value = place.place_id;
			(<HTMLInputElement>document.getElementById('lattitude')).value = place.geometry.location.lat();
			(<HTMLInputElement>document.getElementById('longitude')).value = place.geometry.location.lng();
		})
	}
	addPlaces() {
		var area = (<HTMLInputElement>document.getElementById('area')).value;
		var place_id = (<HTMLInputElement>document.getElementById('place_id')).value;
		var lattitude = (<HTMLInputElement>document.getElementById('lattitude')).value;
		var longitude = (<HTMLInputElement>document.getElementById('longitude')).value;
		if(area!='' && place_id!='')
		{
			this.areaArr.push(area);
			//console.log(this.areaArr);
			this.unique_area_arr = [...new Set(this.areaArr)];
			//console.log(this.unique_area_arr);
			
			this.googlePlaceIdArr.push(place_id);
			this.unique_googlePlaceIdArr = [...new Set(this.googlePlaceIdArr)];
			//console.log(this.unique_googlePlaceIdArr);
			
			this.lat_array.push(lattitude);
			this.unique_lat_array = [...new Set(this.lat_array)];
			
			this.lng_array.push(longitude);
			this.unique_lng_array = [...new Set(this.lng_array)];
			
			(<HTMLInputElement>document.getElementById('area')).value = "";
			(<HTMLInputElement>document.getElementById('place_id')).value = "";
			(<HTMLInputElement>document.getElementById('lattitude')).value = "";
			(<HTMLInputElement>document.getElementById('longitude')).value = "";
		}
	}
	removePlace(i,area_name,place_id,lattitude,longitude) {
		this.unique_area_arr.splice(i, 1);
		var index = this.areaArr.indexOf(area_name);
		if (index !== -1) this.areaArr.splice(index, 1);
		
		this.unique_googlePlaceIdArr.splice(i, 1);
		var index2 = this.googlePlaceIdArr.indexOf(place_id);
		if (index2 !== -1) this.googlePlaceIdArr.splice(index2, 1);
		
		this.unique_lat_array.splice(i, 1);
		var index3 = this.lat_array.indexOf(lattitude);
		if (index3 !== -1) this.lat_array.splice(index3, 1);
		
		this.unique_lng_array.splice(i, 1);
		var index4 = this.lng_array.indexOf(longitude);
		if (index4 !== -1) this.lng_array.splice(index4, 1);
	}
	onChangeTimezone(timezone_id: number) {
		if(timezone_id) {
			this.spinnerService.show();
			this.adminservice.HttpGetReq(`admin/getTimezoneDetails?token=${this.logtoken}&timezone_id=${timezone_id}`, true)
			.then(
				(response: any) => {
					this.timezoneDetails = response.data;
					console.log(this.timezoneDetails);
					this.spinnerService.hide();
				},
				(error) => {
					this.spinnerService.hide();
				}
			);
		}
	}
	
	addData() {
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
		if(this.unique_area_arr.length <= 0)
		{
			alert('Please add area first');
			return false;
		}
		if(addcontent.currency == '')
		{
			alert('Currecny not selected');
			return false;
		}
		addcontent.timezone_value = this.timezoneDetails.timezone_value;
		//console.log(addcontent); return false;
		
		//const form_data = new FormData();
    
		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/saveQueryCategory?token=${this.logtoken}`, addcontent, true)
		.then(
		  (response: any) => {
				if(response.success == true) {
					console.log('cat id',response.Data._id);
					this.addArea(response.Data._id);
					this.spinnerService.hide();
					this.toastr.success(response.message);
					//this.router.navigateByUrl('/main/category-list');
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
	addArea(category_id) {
		const addcontent = this.addForm.value;
		const area_obj = {
			country_id: addcontent.country_id,
			state_id: addcontent.state_id,
			city_id: addcontent.city_id,
			category_id: category_id,
			sub_category_id: "",
			lattitude: this.lattitude,
			longitude: this.longitude,
			view_port_northeast_lat: this.view_port_northeast_lat,
			view_port_northeast_lng: this.view_port_northeast_lng,
			view_port_southwest_lat: this.view_port_southwest_lat,
			view_port_southwest_lng: this.view_port_southwest_lng,
		}
		this.adminservice.HttpPostReq(`admin/saveQueryCatArea?token=${this.logtoken}`, area_obj, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.addAreaPlace(response.data._id);
				}
			},
			(error) => {
				
			}
		);
	}
	addAreaPlace(area_id) {
		const area_places_obj = {
			area_id: area_id,
			places_array: this.unique_area_arr,
			places_id_array: this.unique_googlePlaceIdArr,
			lattitude: this.unique_lat_array,
			longitude: this.unique_lng_array
		}
		this.adminservice.HttpPostReq(`admin/saveQueryCatAreaPlaces?token=${this.logtoken}`, area_places_obj, true)
			.then(
				(response: any) => {
					this.unique_area_arr = [];
					this.unique_googlePlaceIdArr = [];
					this.unique_lat_array = [];
					this.unique_lng_array = [];
					this.areaArr = [];
					this.googlePlaceIdArr = [];
					this.lat_array = [];
					this.lng_array = [];
				},
				(error) => {
					
				}
			);
	}
	backtolist() {
		console.log('hi....');
		this.router.navigateByUrl('/main/query-category-list');
	}

}
