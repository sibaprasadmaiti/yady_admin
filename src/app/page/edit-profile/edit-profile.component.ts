import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public edit_id: any;
  EditProfileForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  optionValue;
  countryData: any[] = [];
  stateData: any[] = [];
  cityData: any[] = [];
  country;
  state;
  city;
  profile_id: any;

  constructor(private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    public toastr: ToastrService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar) {

    this.EditProfileForm = formbuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)])],
      country_code: ['', Validators.compose([Validators.required])],
      only_mobile_no: ['', Validators.compose([Validators.required])],
      country_id: ['', Validators.compose([Validators.required])],
      state_id: ['', Validators.compose([Validators.required])],
      city_id: ['', Validators.compose([Validators.required])],
    });

  }

  ngOnInit() {
    this.getCountryList();
    this.route.params.subscribe(params => {
      this.profile_id = params.id;
    });

    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/serviceDispatcherById/${this.profile_id}/?token=${this.logtoken}`, true)
      .then((response: any) => {
        this.spinnerService.hide();
        console.log(response.data.country_id);
        this.EditProfileForm.patchValue({
          country_id: response.data.country_id,
          state_id: response.data.state_id,
          city_id: response.data.city_id,
          first_name: response.data.name.substr(0, response.data.name.indexOf(' ')),
          last_name: response.data.name.substr(response.data.name.indexOf(' ') + 1),
          email: response.data.email,
          country_code: response.data.country_code,
          only_mobile_no: response.data.only_mobile_no,
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

  updateProfile() {
    this.spinnerService.show();
    const updatecontent = this.EditProfileForm.value;
    const form_data = new FormData();

    form_data.append('first_name', updatecontent.first_name);
    form_data.append('last_name', updatecontent.last_name);
    form_data.append('country_code', updatecontent.country_code);
    form_data.append('only_mobile_no', updatecontent.only_mobile_no);
    form_data.append('country_id', updatecontent.country_id);
    form_data.append('state_id', updatecontent.state_id);
    form_data.append('city_id', updatecontent.city_id);
    form_data.append('id', this.profile_id);

    this.adminservice.HttpPostReq(`admin/updateProfile?token=${this.logtoken}`, form_data, true)
      .then((response: any) => {
        if (response.success === true) {
          this.spinnerService.hide();
          this.snackBar.open(response.message, 'End now', {
            duration: 5000,
          });
          this.router.navigateByUrl('/main/dashboard');
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
