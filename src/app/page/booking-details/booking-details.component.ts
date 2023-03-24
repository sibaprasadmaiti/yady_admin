import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  bookingData: any;
  booking_id: null;
  total_cost: number;
  spLat: any;
  spLng: any;
  srLat: any;
  srLng: any;
  adminType: any = 0;
  constructor(
    private route: ActivatedRoute,
    public adminservice: ApiServiceService,
    private router: Router,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
			this.booking_id = params.booking_id;
      this.getBookingDetails();
		});
    
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
        console.log('response.data', response.data);
        if(response.success){
          this.adminType = response.data.admin_type;
        }else{
          this.toastr.error(response.message);
        }

      },
      (error) => {
        console.log("Error => ", error);
      }
    );
  }
  getBookingDetails() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/bookingDetails/?token=${this.logtoken}&booking_id=${this.booking_id}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.bookingData = response.data;
					console.log(this.bookingData);

					this.srLat = parseFloat(response.data.customer_lat);
					this.srLng = parseFloat(response.data.customer_lng);
					this.spLat = parseFloat(response.data.spDetails.lattitude);
					this.spLng = parseFloat(response.data.spDetails.longitude);

					this.spinnerService.hide();
					this.toastr.success(response.message);
					var pause_cost = 0;
					if(this.bookingData.pause_docs.length > 0) {
						for(var x = 0; x < this.bookingData.pause_docs.length; x++) {
							pause_cost += parseInt(this.bookingData.pause_docs[x].cost);
						}
					}
					console.log('pause_cost',pause_cost);
					if(this.bookingData.promo_code_id!="" && this.bookingData.promo_code_id!=null) {
						this.total_cost = parseInt(this.bookingData.actual_cost) + pause_cost + parseInt(this.bookingData.discount);
					} else {
						this.total_cost = parseInt(this.bookingData.actual_cost) + pause_cost;
					}
					console.log('this.total_cost',this.total_cost);
					//console.log(this.total_cost + parseInt(this.bookingData.discount));
					//console.log((this.bookingData.discount ));
					//console.log('zzz', (this.bookingData.add_on_data_arr) );

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
  bookingList(){
    this.router.navigateByUrl('/main/booking-list');
  }

  bookingImages(){
    this.router.navigateByUrl('/main/booking-images/'+this.booking_id);
  }

  onPrint(divName: any) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

	view_pause_details(booking_id: any){
		//this.router.navigateByUrl('/main/booking-pause-details/'+booking_id);
		//console.log(location.origin); return false;
		var baseU = location.origin;
		var url = baseU+'/projects/pranay/rahul/yady/yady_admin/#/main/booking-pause-details/'+booking_id;
		window.open(url, "_blank");
	}

  startTracking(booking_id: any){
   this.router.navigateByUrl('/main/start-tracking/' + booking_id);
  }

  back() {
    this.router.navigateByUrl('/main/booking-list');
  }
}
