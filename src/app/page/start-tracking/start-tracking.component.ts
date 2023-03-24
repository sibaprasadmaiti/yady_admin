import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-start-tracking',
  templateUrl: './start-tracking.component.html',
  styleUrls: ['./start-tracking.component.scss']
})
export class StartTrackingComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  bookingData: any;
  booking_id: any;
  spLat: any;
  spLng: any;
  srLat: any;
  srLng: any;
  origin: any;
  destination: any;
  renderOptions = {
    suppressMarkers: true,
    polylineOptions: { strokeColor: '#00B2B2', strokeWeight: '6' }
  }

  markerOptions = {
    origin: {
      icon: './assets/img/sr-track.png',
    },
    destination: {
      icon: './assets/img/sp-track.png',
      label: 'Service Requester',
      opacity: 0.8,
    },
  }

  constructor(private route: ActivatedRoute,
    public adminservice: ApiServiceService,
    private router: Router,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog,
    public socket: Socket,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
			this.booking_id = params.booking_id;
      this.getBookingDetails();
		});

    this.socket.on('connected', message => {
      if (message == 'Welcome') {
        console.log("Admin socket is connected for tracking.....");
        this.socket.on('locations', data => {
          console.log("location data => ", data);
          this.origin = { lat: data.latitude, lng: data.longitude };
        });
      }
    });
  }

  getBookingDetails() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/bookingDetails/?token=${this.logtoken}&booking_id=${this.booking_id}`, true)
		.then(
			(response: any) => {
        console.log("Booking details responce => ",response);
				if(response.success == true) {
					this.bookingData = response.data;

          this.spLat = parseFloat(response.data.spDetails.lattitude);
          this.spLng = parseFloat(response.data.spDetails.longitude);
          this.origin = { lat: this.spLat, lng: this.spLng };

          this.srLat = parseFloat(response.data.customer_lat);
          this.srLng = parseFloat(response.data.customer_lng);
          this.destination = { lat: this.srLat, lng: this.srLng };

					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.bookingData = [];
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
