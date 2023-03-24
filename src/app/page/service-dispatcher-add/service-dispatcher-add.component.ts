import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-service-dispatcher-add',
  templateUrl: './service-dispatcher-add.component.html',
  styleUrls: ['./service-dispatcher-add.component.scss']
})
export class ServiceDispatcherAddComponent implements OnInit {
	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	addcontent: any;
	isShown;
	isXyzChecked = false;
	optionValue;
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
  type: any;
  stateHide = true;
  cityHide = true;
  stateId;
  cityId;

  constructor(public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) {

		this.addForm = formbuilder.group(
		{
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			email : ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)])],
			country_code : ['', Validators.compose([Validators.required])],
			only_mobile_no: ['', Validators.compose([Validators.required])],
			admin_type: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
			service_requester: [''],
			service_provider: [''],
			service_dispatcher: [''],
			category: [''],
			promotion: [''],
      bookings: [''],
      zone: [''],
      holidays: [''],
      sr_reschedule: [''],
      query_service: [''],
      banner_management: [''],
      quotation_approval: [''],
      notification_management: [''],
			country_id: ['', Validators.compose([Validators.required])],
			state_id: [''],
			city_id: [''],
		}
      );

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

  onChangeType(type: any){
    this.type = type;
    if(this.type == 1){
      this.stateHide = false;
      this.cityHide = false;
      this.stateId = [];
      this.cityId = null;
    }
    if(this.type == 2){
      this.stateHide = true;
      this.cityHide = false;
      this.cityId = null;
    }
    if(this.type == 3){
      this.stateHide = true;
      this.cityHide = true;
    }
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
    this.stateId = stateId;
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
  onChangeCity(cityId: number){
    this.cityId = cityId;
  }

  addData() {
    this.spinnerService.show();
    console.log('999999');
    const addcontent = this.addForm.value;
	//console.log('addcontent:', addcontent); //return false;

	const  form_data = new FormData();
	form_data.append('admin_type', addcontent.admin_type);
	form_data.append('first_name', addcontent.first_name);
	form_data.append('last_name', addcontent.last_name);
	form_data.append('email', addcontent.email);
	form_data.append('password', addcontent.password);
	form_data.append('country_code', addcontent.country_code);
	form_data.append('only_mobile_no', addcontent.only_mobile_no);
	form_data.append('country_id', addcontent.country_id);

  // form_data.append('state_id', this.stateId);
	// form_data.append('city_id', this.cityId);
  if(this.type == 1){
    form_data.append('state_id', this.stateId);
    form_data.append('city_id', this.cityId );
  }
  if(this.type == 2){
    form_data.append('state_id', addcontent.state_id);
    form_data.append('city_id', this.cityId);
  }
  if(this.type == 3){
   form_data.append('state_id', addcontent.state_id);
	form_data.append('city_id', addcontent.city_id);
  }

	if(addcontent.service_requester) {
		form_data.append('service_requester', '1');
	} else {
		form_data.append('service_requester', '0');
	}
	if(addcontent.service_provider) {
		form_data.append('service_provider', '1');
	} else {
		form_data.append('service_provider', '0');
	}
	if(addcontent.service_dispatcher) {
		form_data.append('service_dispatcher', '1');
	} else {
		form_data.append('service_dispatcher', '0');
	}
	if(addcontent.category) {
		form_data.append('category', '1');
	} else {
		form_data.append('category', '0');
	}
	if(addcontent.promotion) {
		form_data.append('promotion', '1');
	} else {
		form_data.append('promotion', '0');
	}
  if(addcontent.bookings) {
		form_data.append('bookings', '1');
	} else {
		form_data.append('bookings', '0');
	}
  if(addcontent.zone) {
		form_data.append('zone', '1');
	} else {
		form_data.append('zone', '0');
	}
  if(addcontent.holidays) {
		form_data.append('holidays', '1');
	} else {
		form_data.append('holidays', '0');
	}
  if(addcontent.sr_reschedule) {
		form_data.append('sr_reschedule', '1');
	} else {
		form_data.append('sr_reschedule', '0');
	}
  if(addcontent.query_service) {
		form_data.append('query_service', '1');
	} else {
		form_data.append('query_service', '0');
	}
  if(addcontent.banner_management) {
		form_data.append('banner_management', '1');
	} else {
		form_data.append('banner_management', '0');
	}
  if(addcontent.quotation_approval) {
		form_data.append('quotation_approval', '1');
	} else {
		form_data.append('quotation_approval', '0');
	}
  if(addcontent.notification_management) {
		form_data.append('notification_management', '1');
	} else {
		form_data.append('notification_management', '0');
	}
console.log("data => ", form_data);
console.log("state id => ", this.stateId);
console.log("city id => ", this.cityId);

    // this.adminservice.HttpGetReq(`admin/homecategorylist?token=${this.logtoken}`, true)
    this.adminservice.HttpPostReq(`admin/addServiceDispatcher?token=${this.logtoken}`, form_data, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       console.log("Save dispatcher responce => ", response);

       if (response.success === true){
			this.toastr.success(response.message);
			this.router.navigateByUrl('/main/service-dispatcher-management');
       } else {
			this.toastr.success(response.message);
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

toggleShow(event) {

}

backtolist() {
		this.router.navigateByUrl('/main/service-dispatcher-management');
	}

}
