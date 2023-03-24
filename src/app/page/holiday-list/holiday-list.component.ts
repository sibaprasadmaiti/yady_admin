import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {

	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	showColor = false;
	showInfo = false;
	holidayData: any;
	imageButtons = [ {src: 'tickg.png', name: 'tickg'},
	{src: 'cross.png', name: 'cross'}];
	searchForm: FormGroup;
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];
  city_id = "";
  state_id = "";
  country_id = "";
  adminType: any;

  constructor(public adminservice: ApiServiceService,
              private router: Router,
              public formbuilder: FormBuilder,
              public toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) {

				this.searchForm = formbuilder.group({
					country_id: [''],
					state_id: [''],
					city_id: [''],
				});

			}

  ngOnInit() {
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
        this.adminType = response.data.admin_type;
        if (response.data.admin_type == 3) {
          this.city_id = response.data.city_id;
        }
        if (response.data.admin_type == 2) {
          this.state_id = response.data.state_id;
        }
        if (response.data.admin_type == 1) {
          this.country_id = response.data.country_id;
        }
        this.getCountryList();
        this.holidayList();
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

	holidayList()
	{
    if(this.adminType == 0){
      const searchcontent = this.searchForm.value;
      // if(searchcontent.country_id == undefined) {
      //   var c_id = undefined;
      // } else {
        this.country_id = searchcontent.country_id;
      //}
      // if(searchcontent.state_id == undefined) {
      //   var s_id = undefined;
      // } else {
        this.state_id = searchcontent.state_id;
      //}
      // if(searchcontent.city_id == undefined) {
      //     this.city_id = undefined;
      // } else {
        //if(this.adminType != 3){
          this.city_id = searchcontent.city_id;
        //}
      //}
    }

    console.log("city id => ", this.city_id);
    console.log("state id => ", this.state_id);
    console.log("country id => ", this.country_id);
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getHoliday/?token=${this.logtoken}&country_id=${this.country_id}&state_id=${this.state_id}&city_id=${this.city_id}&admin_type=${this.adminType}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.holidayData = response.data;
					console.log('this.holidayData',this.holidayData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.holidayData = [];
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

	deleteHoliday(holiday_id) {
		this.spinnerService.show();
		const addcontent = {
			holiday_id: holiday_id
		}
		this.adminservice.HttpPostReq(`admin/deleteHoliday?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				this.holidayList();
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

	addNew() {
		this.router.navigateByUrl('/main/holiday-add');
	}

	reset_page() {
		this.searchForm.reset();
		this.holidayList();
	}

	editHoliday(holiday_id) {
		this.router.navigateByUrl('/main/holiday-edit/'+holiday_id);
	}

}
