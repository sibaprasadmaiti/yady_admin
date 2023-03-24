import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-service-dispatcher-edit',
  templateUrl: './service-dispatcher-edit.component.html',
  styleUrls: ['./service-dispatcher-edit.component.scss']
})
export class ServiceDispatcherEditComponent implements OnInit {

  public edit_id: any;
  EditForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  optionValue;
  countryData: any[] = [];
  stateData: any[] = [];
  cityData: any[] = [];
  country;
  state;
  city;
  type: any;
  stateHide = true;
  cityHide = true;
  stateId;
  cityId;

  constructor(private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    public toastr: ToastrService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar) {

    this.EditForm = formbuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)])],
      country_code: ['', Validators.compose([Validators.required])],
      only_mobile_no: ['', Validators.compose([Validators.required])],
      admin_type: ['', Validators.compose([Validators.required])],
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
    });
  }

  ngOnInit() {
    this.getCountryList();
    this.route.params.subscribe(params => {
      this.edit_id = params.id;
    });
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/serviceDispatcherById/${this.edit_id}/?token=${this.logtoken}`, true)
      .then((response: any) => {
        this.spinnerService.hide();

        console.log("service dispatcher responce data => ", response);
        this.type = response.data.admin_type;
        if(this.type == 1){
          this.stateHide = false;
          this.cityHide = false;
          // this.stateId = [];
          // this.cityId = null;
        }
        if(this.type == 2){
          this.stateHide = true;
          this.cityHide = false;
          //this.cityId = null;
        }

        this.EditForm.patchValue({
          first_name: response.data.name.substr(0, response.data.name.indexOf(' ')),
          last_name: response.data.name.substr(response.data.name.indexOf(' ') + 1),
          email: response.data.email,
          country_code: response.data.country_code,
          only_mobile_no: response.data.only_mobile_no,
          admin_type: response.data.admin_type,
          country_id: response.data.country_id,
          state_id: response.data.state_id,
          city_id: response.data.city_id,
          service_requester: response.pdata.service_requester,
          service_dispatcher: response.pdata.service_dispatcher,
          service_provider: response.pdata.service_provider,
          category: response.pdata.category,
          promotion: response.pdata.promotion,
          bookings: response.pdata.bookings,
          zone: response.pdata.zone,
          holidays: response.pdata.holidays,
          sr_reschedule: response.pdata.sr_reschedule,
          query_service: response.pdata.query_service,
          banner_management: response.pdata.banner_management,
          quotation_approval: response.pdata.quotation_approval,
          notification_management: response.pdata.notification_management,
        });
        if (response.data.country != null) {
          this.country = response.data.country;
        } else {
          this.country = 'Select Country';
        }
        if (response.data.state != null) {
          this.state = response.data.state;
        } else {
          this.state = 'Select State';
        }
        if (response.data.city != null) {
          this.city = response.data.city;
        } else {
          this.city = 'Select City';
        }

        this.onChangeCountry(response.data.country_id);
        this.onChangeState(response.data.state_id);
      },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error', 'End now', {
            duration: 5000,
          });
        }
      );
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
    if (countryId) {
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
    this.stateId = stateId;
    if (stateId) {
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

  updateData() {
    this.spinnerService.show();
    const updatecontent = this.EditForm.value;
    //console.log(updatecontent); return false;
    const form_data = new FormData();
    form_data.append('admin_type', updatecontent.admin_type);
    form_data.append('first_name', updatecontent.first_name);
    form_data.append('last_name', updatecontent.last_name);
    form_data.append('country_code', updatecontent.country_code);
    form_data.append('only_mobile_no', updatecontent.only_mobile_no);
    form_data.append('country_id', updatecontent.country_id);
    if(this.type == 1){
      form_data.append('state_id', this.stateId);
      form_data.append('city_id', this.cityId );
    }
    if(this.type == 2){
      form_data.append('state_id', updatecontent.state_id);
      form_data.append('city_id', this.cityId);
    }
    if(this.type == 3){
      form_data.append('state_id', updatecontent.state_id);
      form_data.append('city_id', updatecontent.city_id);
    }

    if (updatecontent.service_requester) {
      form_data.append('service_requester', '1');
    } else {
      form_data.append('service_requester', '0');
    }
    if (updatecontent.service_provider) {
      form_data.append('service_provider', '1');
    } else {
      form_data.append('service_provider', '0');
    }
    if (updatecontent.service_dispatcher) {
      form_data.append('service_dispatcher', '1');
    } else {
      form_data.append('service_dispatcher', '0');
    }
    if (updatecontent.category) {
      form_data.append('category', '1');
    } else {
      form_data.append('category', '0');
    }
    if (updatecontent.promotion) {
      form_data.append('promotion', '1');
    } else {
      form_data.append('promotion', '0');
    }
    if (updatecontent.bookings) {
      form_data.append('bookings', '1');
    } else {
      form_data.append('bookings', '0');
    }
    if (updatecontent.zone) {
      form_data.append('zone', '1');
    } else {
      form_data.append('zone', '0');
    }
    if (updatecontent.holidays) {
      form_data.append('holidays', '1');
    } else {
      form_data.append('holidays', '0');
    }
    if (updatecontent.sr_reschedule) {
      form_data.append('sr_reschedule', '1');
    } else {
      form_data.append('sr_reschedule', '0');
    }
    if (updatecontent.query_service) {
      form_data.append('query_service', '1');
    } else {
      form_data.append('query_service', '0');
    }
    if (updatecontent.banner_management) {
      form_data.append('banner_management', '1');
    } else {
      form_data.append('banner_management', '0');
    }
    if (updatecontent.quotation_approval) {
      form_data.append('quotation_approval', '1');
    } else {
      form_data.append('quotation_approval', '0');
    }
    if (updatecontent.notification_management) {
      form_data.append('notification_management', '1');
    } else {
      form_data.append('notification_management', '0');
    }
    form_data.append('user_id', this.edit_id);

    this.adminservice.HttpPostReq(`admin/updateServiceDispatcher?token=${this.logtoken}`, form_data, true)
      .then((response: any) => {
        if (response.success === true) {
          this.spinnerService.hide();
          this.snackBar.open(response.message, 'End now', {
            duration: 5000,
          });
          this.router.navigateByUrl('/main/service-dispatcher-management');
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

  backtolist() {
    this.router.navigateByUrl('/main/service-dispatcher-management');
  }

}
