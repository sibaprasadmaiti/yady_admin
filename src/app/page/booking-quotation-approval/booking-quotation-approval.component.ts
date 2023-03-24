import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-quotation-approval',
  templateUrl: './booking-quotation-approval.component.html',
  styleUrls: ['./booking-quotation-approval.component.scss']
})
export class BookingQuotationApprovalComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  pauseData: any;
  booking_id: null;
  booking_pause_id: null;
  postData: any;
  showhide = 'non_edit';
  price: any;
  valueId;
  type;

  constructor( private route: ActivatedRoute,
    public adminservice: ApiServiceService,
    private router: Router,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
			this.booking_id = params.booking_id;
			this.booking_pause_id = params.booking_pause_id;
			this.type = params.type;
      this.getBookingQuotationDetails(params.booking_id, params.booking_pause_id);
		});
  }

  getBookingQuotationDetails(booking_id: String, booking_pause_id: String) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/viewQuotation/?token=${this.logtoken}&booking_id=${booking_id}&booking_pause_id=${booking_pause_id}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.pauseData = response.data;
					console.log(this.pauseData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.pauseData = [];
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

  approveQuotation() {
		this.spinnerService.show();
    this.postData = {booking_id: this.booking_id, booking_pause_id: this.booking_pause_id, booking_type: this.type};
    this.adminservice.HttpPostReq(`admin/approveQuotation/?token=${this.logtoken}`, this.postData, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					console.log(response.data);
					if(this.type == 'a') {
						this.router.navigateByUrl('/main/booking-list');
					} else if(this.type == 'b') {
						this.router.navigateByUrl('/main/query-booking-list');
					}
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.spinnerService.hide();
					this.toastr.success(response.message);
				}
			},
				(error) => {
          console.log(error);

					this.spinnerService.hide();
					this.toastr.error('Internal server error');
					this.snackBar.open('Internal server error', 'End now', {
					duration: 5000,
				});
			}
		);
	}
	
	editCost(cost) {
		console.log(cost);
		this.showhide = 'edit';
		this.price = cost;
	}
	updateCost(cost) {
		this.showhide = 'non_edit';
		console.log('cost',cost);
		if(cost!='' && cost!=undefined) {
			this.spinnerService.show();
			const edit_data = {booking_id: this.booking_id, booking_pause_id: this.booking_pause_id, cost: cost, booking_type: this.type};
			this.adminservice.HttpPostReq(`admin/updateQuotationCost/?token=${this.logtoken}`, edit_data, true)
			.then(
				(response: any) => {
					if(response.success == true) {
						console.log(response.data);
						this.getBookingQuotationDetails(this.booking_id,this.booking_pause_id);
						this.spinnerService.hide();
						this.toastr.success(response.message);
					} else {
						this.spinnerService.hide();
						this.toastr.success(response.message);
					}
				},
					(error) => {
						console.log(error);
						this.spinnerService.hide();
						this.toastr.error('Internal server error');
						this.snackBar.open('Internal server error', 'End now', {
						duration: 5000,
					});
				}
			);
		} else {
			this.toastr.success('Please write a value in the cost text box');
		}
	}
	cancelEdit() {
		this.showhide = 'non_edit';
	}

}
