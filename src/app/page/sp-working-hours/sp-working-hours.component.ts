import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sp-working-hours',
  templateUrl: './sp-working-hours.component.html',
  styleUrls: ['./sp-working-hours.component.scss']
})
export class SpWorkingHoursComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
	sp_id;
  workingHourList: any;
  onlineStatus: any;

  constructor(private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    public toastr: ToastrService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
			this.sp_id = params.sp_id;
		});
    this.getSpWorkingAreaList(this.sp_id);
    this.getOnlineStatus(this.sp_id)
  }

  getSpWorkingAreaList(sp_id: any) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getWorkingHours/?token=${this.logtoken}&service_provider_id=${sp_id}`, true)
		.then((response: any) => {
      console.log("working hour list ", response);

      if (response.success === true) {
				this.spinnerService.hide();
        this.workingHourList = response.data;
        this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
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

  getOnlineStatus(sp_id: any) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getOnlineStatus/?token=${this.logtoken}&service_provider_id=${sp_id}`, true)
		.then((response: any) => {
      console.log("online status ", response);

      if (response.success === true) {
				this.spinnerService.hide();
        this.onlineStatus = response.data;
        this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
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
