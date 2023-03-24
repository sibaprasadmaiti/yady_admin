import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-query-booking-details',
  templateUrl: './query-booking-details.component.html',
  styleUrls: ['./query-booking-details.component.scss']
})
export class QueryBookingDetailsComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  bookingData: any;
  queryBookingId: null;
  total_cost: number;
  spLat: any;
  spLng: any;
  srLat: any;
  srLng: any;

  constructor(private route: ActivatedRoute,
    public adminservice: ApiServiceService,
    private router: Router,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
			this.queryBookingId = params.query_booking_id;
      this.getBookingDetails();
		});
  }

  getBookingDetails() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/queryBookingDetails/?token=${this.logtoken}&query_booking_id=${this.queryBookingId}`, true)
		.then(
			(response: any) => {
        console.log("Query booking details response => ", response);

				if(response.success == true) {
          this.spinnerService.hide();
          this.toastr.success(response.message);
					this.bookingData = response.data;
					this.srLat = parseFloat(response.data.customer_lat);
					this.srLng = parseFloat(response.data.customer_lng);
					this.spLat = parseFloat(response.data.splat);
					this.spLng = parseFloat(response.data.splng);
				} else {
					this.bookingData = {};
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

  onPrint(divName: any) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

  back() {
    this.router.navigateByUrl('/main/query-booking-list');
  }

}
