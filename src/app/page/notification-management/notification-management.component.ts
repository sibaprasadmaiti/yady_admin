import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrls: ['./notification-management.component.scss']
})
export class NotificationManagementComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  sendForm: FormGroup;
  srList: any;
  city_id: any = "";
  state_id: any = "";
  country_id: any = "";
  user_type: any = 0;
  adminType: any;
  error_msg = "";
  countryData: any[] = [];
  stateData: any[] = [];
  cityData: any[] = [];

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public formbuilder: FormBuilder) {
      this.sendForm = formbuilder.group({
        service_requester_array: ['',Validators.compose([Validators.required])],
        title: ['',Validators.compose([Validators.required])],
        message: ['',Validators.compose([Validators.required])],
      });

     }

  ngOnInit() {
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
        this.adminType = response.data.admin_type;
        // if (response.data.admin_type == 3) {
        //   this.city_id = response.data.city_id;
        // }
        // if (response.data.admin_type == 2) {
        //   this.state_id = response.data.state_id;
        // }
        // if (response.data.admin_type == 1) {
        //   this.country_id = response.data.country_id;
        // }

        this.getCountryList()
      },
      (error) => {
        console.log("Error => ", error);
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

  searchSrSp(){
    if(this.country_id == ""){
      alert("Please select country.");
      return false;
    }
    if(this.state_id == ""){
      alert("Please select state.");
      return false;
    }
    if(this.city_id == ""){
      alert("Please select city.");
      return false;
    }
    if(this.user_type == "" || this.user_type == 0){
      alert("Please choose user type.");
      return false;
    }
    this.getSrForSendNotification();
  }

  getSrForSendNotification(){
    this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getSrForSendNotification/?token=${this.logtoken}&country_id=${this.country_id}&state_id=${this.state_id}&city_id=${this.city_id}&adminType=${this.adminType}&user_type=${this.user_type}`, true)
		.then(
			(response: any) => {
				console.log("SR list for notification responce => ", response);
				if(response.success == true) {
					this.srList = response.data;
          this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.srList = [];
					this.spinnerService.hide();
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

  sendNotification(){
    const addcontent = this.sendForm.value;
    console.log(addcontent);

		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/sendNotificationToSr?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
        console.log("send notification responce => ", response);
        if(response.success){
          this.spinnerService.hide();
          this.toastr.success(response.message);
          window.location.reload();
          //this.sendForm.reset();
        }else{
          this.spinnerService.hide();
          this.error_msg = response.message;
          this.error_msg = response.message;
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

}
