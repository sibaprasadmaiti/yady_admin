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
  selector: 'app-zone-add',
  templateUrl: './zone-add.component.html',
  styleUrls: ['./zone-add.component.scss']
})
export class ZoneAddComponent implements OnInit {

	zoneAddForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
	areaArr:any = [];
	unique_area_arr:any = [];
	googlePlaceIdArr:any = [];
	city_name: any;
	lattitude: any;
	longitude: any;
	
	view_port_northeast_lat: any;
	view_port_northeast_lng: any;
	view_port_southwest_lat: any;
	view_port_southwest_lng: any;
	
	
	

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder,public HttpClient: HttpClient) { 
	
		this.zoneAddForm = formbuilder.group({
			zone_name: ['', Validators.compose([Validators.required])],
			country_id: ['', Validators.compose([Validators.required])],
			state_id: ['', Validators.compose([Validators.required])],
			city_id: ['', Validators.compose([Validators.required])]
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
								console.log(response.results[0].geometry.viewport);
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
	addZone() {
		const addcontent = this.zoneAddForm.value;
		addcontent.lattitude = (<HTMLInputElement>document.getElementById('lat')).value;
		addcontent.longitude = (<HTMLInputElement>document.getElementById('long')).value;
		
		addcontent.view_port_northeast_lat = (<HTMLInputElement>document.getElementById('view_port_northeast_lat')).value;
		addcontent.view_port_northeast_lng = (<HTMLInputElement>document.getElementById('view_port_northeast_lng')).value;
		addcontent.view_port_southwest_lat = (<HTMLInputElement>document.getElementById('view_port_southwest_lat')).value;
		addcontent.view_port_southwest_lng = (<HTMLInputElement>document.getElementById('view_port_southwest_lng')).value;
		console.log(addcontent);
		
		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/saveZone?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				console.log('x',response.data);
				this.router.navigateByUrl('/main/zone-places/'+response.data._id);
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
	/*addPlaces() {
		var area = (<HTMLInputElement>document.getElementById('area')).value;
		var place_id = (<HTMLInputElement>document.getElementById('place_id')).value;
		if(area!='' && place_id!='')
		{
			this.areaArr.push(area);
			//console.log(this.areaArr);
			this.unique_area_arr = [...new Set(this.areaArr)];
			console.log(this.unique_area_arr);
		}
	}*/
	zoneList() {
		this.router.navigateByUrl('/main/zone-list');
	}
}
