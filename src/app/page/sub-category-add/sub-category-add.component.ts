import { AfterViewInit, Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
declare var google;

@Component({
  selector: 'app-sub-category-add',
  templateUrl: './sub-category-add.component.html',
  styleUrls: ['./sub-category-add.component.scss']
})
export class SubCategoryAddComponent implements OnInit, AfterViewInit {

	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	addcontent: any;
	original_pic = '';
	file: any;
	public cat_id: any;
	category_id;
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
	categoryDetailsData: any[] = [];
	price_status;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
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
			area: [''],
			sub_category_name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
			category_id: [''],
			material_cost: [''],
			inspection_cost: [''],
			fixed_price_hour: [''],
			start_time: [''],
			end_time: [''],
			timezone_id: [''],
			price_structure_question: ['', Validators.compose([Validators.required])],
			aq_status: ['', Validators.compose([Validators.required])],
			currency: [''],
			time_interval: [''],
			image2: ['', Validators.compose([Validators.required])],
			itemRows: this.formbuilder.array([this.initItemRows()])
		});
	}

	ngAfterViewInit(): void {
		//console.log('1');
    }

  ngOnInit() {
	this.route.params.subscribe(params => {
		this.cat_id = params.cat_id;
	});
	this.addForm.patchValue({
		category_id: this.cat_id
	});

	this.getCountryList();
	this.getTimezoneList();
	this.categoryDetails();
  }

  get formArr() {
    return this.addForm.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this.formbuilder.group({
		hour:[''],
		price:[''],
    });
  }
  addNewRow() {
	this.formArr.push(this.initItemRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

	addData() {
		this.spinnerService.show();
		const addcontent = this.addForm.value;
		//console.log(addcontent); return false;
		//console.log(addcontent.itemRows); return false;
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
		if(addcontent.start_time == '') {
			alert('Please enter start time');
			return false;
		}
		if(addcontent.end_time == '') {
			alert('Please enter end time');
			return false;
		}
		if((addcontent.start_time) > (addcontent.end_time))
		{
			alert('Start time should be less than end time');
			return false;
		}
		if(addcontent.sub_category_name == "") {
			alert('Please enter sub category name');
			return false;
		}
    if(addcontent.description == "") {
			alert('Please enter description');
			return false;
		}
		if(addcontent.aq_status == "") {
			alert('Please select addon or questions');
			return false;
		}
		if(addcontent.price_structure_question == '') {
			alert('Please enter price structure question');
			return false;
		}
		addcontent.timezone_value = this.timezoneDetails.timezone_value;
		//console.log(addcontent); return false;
		const  form_data = new FormData();
		/*form_data.append('sub_category_name', addcontent.sub_category_name);
		form_data.append('category_id', addcontent.category_id);
		form_data.append('material_cost', addcontent.material_cost);
		form_data.append('inspection_cost', addcontent.inspection_cost);
		form_data.append('itemRows', JSON.stringify(addcontent.itemRows));*/

		form_data.append('data', JSON.stringify(addcontent));

		if (this.file) { form_data.append('sub_category_image', this.file); }

		this.adminservice.HttpPostReq(`admin/addSubCategory?token=${this.logtoken}`, form_data, true)
			.then(
			(response: any) => {
				if(response.success == true) {
					this.addArea(response.Data.categoryId,response.Data._id);
					this.spinnerService.hide();
					this.toastr.success(response.message);
					this.router.navigateByUrl('/main/sub-category-list/'+this.cat_id);
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
		});
	}

	addArea(category_id,sub_category_id) {
		const addcontent = this.addForm.value;
		const area_obj = {
			country_id: addcontent.country_id,
			state_id: addcontent.state_id,
			city_id: addcontent.city_id,
			category_id: category_id,
			sub_category_id: sub_category_id,
			lattitude: this.lattitude,
			longitude: this.longitude,
			view_port_northeast_lat: this.view_port_northeast_lat,
			view_port_northeast_lng: this.view_port_northeast_lng,
			view_port_southwest_lat: this.view_port_southwest_lat,
			view_port_southwest_lng: this.view_port_southwest_lng,
		}
		this.adminservice.HttpPostReq(`admin/saveCatSubcatArea?token=${this.logtoken}`, area_obj, true)
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
		this.adminservice.HttpPostReq(`admin/saveCatSubcatAreaPlaces?token=${this.logtoken}`, area_places_obj, true)
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

  onFileChoose(event) {
    if (!event.target.files.length) { return; }
    // tslint:disable-next-line:prefer-const
    let file = event.target.files[0];
    // let kb = Math.round((file.size / 1024));
    /*if (kb > (3 * 1024)){
      this.toast.showError("File size too big, please select under 3MB");
      return;
    }*/

    this.file = file;
    // console.log('this.file', this.file);
    // const reader = new FileReader();
    /*reader.onload = e => {
      // console.log(e.target.result)
      this.original_pic = e.target.result.toString(); // reader.result.toString()
    };*/

   // reader.readAsDataURL(this.file);
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
	categoryDetails() {
		this.adminservice.HttpGetReq(`admin/categoryData/${this.cat_id}?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.categoryDetailsData = response.data;
				//console.log(this.categoryDetailsData);
				this.price_status = response.data.price_status;
			},
			(error) => {

			}
		);
	}

}
