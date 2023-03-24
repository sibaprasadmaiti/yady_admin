import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-pause-details',
  templateUrl: './booking-pause-details.component.html',
  styleUrls: ['./booking-pause-details.component.scss']
})
export class BookingPauseDetailsComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	bookingPauseData: any;
	booking_id: null;

  constructor(private route: ActivatedRoute,
    public adminservice: ApiServiceService,
    private router: Router,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.booking_id = params.booking_id;
			this.getBookingPauseDetails();
		});
    }
	
	getBookingPauseDetails() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/bookingPauseDetails/?token=${this.logtoken}&booking_id=${this.booking_id}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.bookingPauseData = response.data;
					console.log(this.bookingPauseData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.bookingPauseData = [];
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

}
