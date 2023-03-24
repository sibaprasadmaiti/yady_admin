import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-images',
  templateUrl: './booking-images.component.html',
  styleUrls: ['./booking-images.component.scss']
})
export class BookingImagesComponent implements OnInit {

	logtoken = localStorage.getItem('LoginToken');
	bookingImageData : any;
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
			this.getBookingImages();
		});
  }

	getBookingImages() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getBookingImages/?token=${this.logtoken}&booking_id=${this.booking_id}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.bookingImageData = response.data;
					console.log('nnnn',this.bookingImageData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.bookingImageData = [];
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
    this.router.navigateByUrl('/main/booking-details/'+ this.booking_id);
  }


}
