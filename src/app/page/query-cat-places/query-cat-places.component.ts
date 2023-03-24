import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
declare var google;

@Component({
  selector: 'app-query-cat-places',
  templateUrl: './query-cat-places.component.html',
  styleUrls: ['./query-cat-places.component.scss']
})
export class QueryCatPlacesComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	area_id;
	areaPlacesForm: FormGroup;
	areaArr:any = [];
	unique_area_arr:any = [];
	googlePlaceIdArr:any = [];
	unique_googlePlaceIdArr:any = [];
	lat_array:any = [];
	unique_lat_array:any = [];
	lng_array:any = [];
	unique_lng_array:any = [];
	@ViewChild('area',{static:true}) input: ElementRef<HTMLInputElement>;
	view_port_northeast_lat;
	view_port_northeast_lng;
	view_port_southwest_lat;
	view_port_southwest_lng
	areaPlacesData: any;
	cat_id;
	subcat_id;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {
			
		this.areaPlacesForm = formbuilder.group({
					area: [''],
					//lat: [''],
					//long: [''],
				});
	}
	
	ngAfterViewInit(): void {
		//console.log('1');
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.area_id = params.area_id;
		});
		this.getAreaDetails(this.area_id);
		/*this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
			.then(
				(response: any) => {
					this.adminType = response.data.admin_type;
				},
			(error) => {
				console.log("Error => ", error);
			}
		);*/
	}
	
	getAreaDetails(area_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getQueryCatAreaDetails?token=${this.logtoken}&area_id=${area_id}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			this.areaPlacesData = response.area_place;
			
			this.view_port_northeast_lat = response.data.view_port_northeast_lat;
			this.view_port_northeast_lng = response.data.view_port_northeast_lng;
			this.view_port_southwest_lat = response.data.view_port_southwest_lat;
			this.view_port_southwest_lng = response.data.view_port_southwest_lng;
			this.cat_id = response.data.category_id;
			//console.log('a',this.view_port_southwest_lat);
			this.getAddressDetails();
		},
		(error) => {
			this.spinnerService.hide();
				this.snackBar.open('Internal server error', 'End now', {
					duration: 5000,
				});
			}
		);
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
			//document.getElementById('long').value = place.geometry.location.lng();
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
	addAreaPlaces() {
		if(this.unique_area_arr.length > 0)
		{
			this.spinnerService.show();
			const area_places_obj = {
				area_id: this.area_id,
				places_array: this.unique_area_arr,
				places_id_array: this.unique_googlePlaceIdArr,
				lattitude: this.unique_lat_array,
				longitude: this.unique_lng_array
			}
			//console.log(zone_places_obj); return false;
			this.adminservice.HttpPostReq(`admin/saveQueryCatAreaPlaces?token=${this.logtoken}`, area_places_obj, true)
			.then(
				(response: any) => {
					this.spinnerService.hide();
					this.toastr.success(response.message);
					//this.router.navigateByUrl('/main/promo-code-list');
					this.getAreaDetails(this.area_id);
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
					this.spinnerService.hide();
					this.toastr.error('Internal server error');
					this.snackBar.open('Internal server error', 'End now', {
						duration: 5000,
					});
				}
			);
		}
		else
		{
			alert('Please add area first');
			return false;
		}
	}
	deletePlace(area_id) {
		this.spinnerService.show();
		if(area_id) {
			const placeObj = {
				area_id: area_id
			}
			
			this.adminservice.HttpPostReq(`admin/deleteQueryAreaPlace?token=${this.logtoken}`, placeObj, true).then((response:any)=>{
				if(response.success == true){
					this.spinnerService.hide();
					this.toastr.success(response.message);
					this.getAreaDetails(this.area_id);
				} else{
					this.spinnerService.hide();
					this.toastr.success(response.message);
				}
			})
		}
	}
	back() {
		this.router.navigateByUrl('/main/query-category-list');
	}
}
