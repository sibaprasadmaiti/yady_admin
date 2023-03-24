import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-assign-booking',
  templateUrl: './assign-booking.component.html',
  styleUrls: ['./assign-booking.component.scss']
})
export class AssignBookingComponent implements OnInit {

	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	booking_id;
	spDetails: any;
  spAssignDetails: any;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) {

		this.addForm = formbuilder.group({
			service_provider_id: ['',Validators.compose([Validators.required])],
		});

	}

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.booking_id = params.booking_id;
		});
	  this.getAreaWiseSP();
  }
	getAreaWiseSP() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getSPBookingAreaWise/?token=${this.logtoken}&booking_id=${this.booking_id}`, true)
		.then(
			(response: any) => {
				console.log(response);
				if(response.success == true) {
					this.spDetails = response.data;
					console.log('ac',this.spDetails);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.spDetails = [];
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

	assignSP() {
		const addcontent = this.addForm.value;
		//console.log(this.addForm.value);
		addcontent.booking_id = this.booking_id;
		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/assignBookingToSP?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				this.router.navigateByUrl('/main/booking-list');
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

  getSPAssignDetails(spId: any) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getSPAssignDetails/?token=${this.logtoken}&booking_id=${this.booking_id}&service_provider_id=${spId}`, true)
		.then(
			(response: any) => {
				console.log("Sp assign details => ",response);
				if(response.success == true) {
					this.spAssignDetails = response;
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.spAssignDetails = [];
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

  back() {
      this.router.navigateByUrl('/main/booking-list');
  }

}
