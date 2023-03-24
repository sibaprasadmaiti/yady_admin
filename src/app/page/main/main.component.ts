import { Component, OnInit,ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSidenav } from '@angular/material';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(MatSidenav,{static:true}) sidenav: MatSidenav;
  logtoken = localStorage.getItem('LoginToken');
  admin_type;
  adminType;
  adminId;
  category_permission;
  promotion_permission;
  service_requester_permission;
  service_provider_permission;
  service_dispatcher_permission;
  bookings_permission;
  zone_permission;
  holidays_permission;
  sr_reschedule_permission;
  query_service_permission;
  banner_management_permission;
  notification_management_permission;

  constructor(public router: Router,public adminservice: ApiServiceService,private spinnerService: Ng4LoadingSpinnerService) { }

	ngOnInit() {

		this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
			.then(
				(response: any) => {
         // console.log("Get profile responce => ", response);

					if(response.data.admin_type == 0 || response.data.admin_type == 1) {
						this.admin_type = 'all';
					} else {
						this.admin_type = 'sub';
					}
          this.adminId = response.data._id;
          this.adminType = response.data.admin_type;
					this.category_permission = response.pdata.category;
					this.promotion_permission = response.pdata.promotion;
					this.service_requester_permission = response.pdata.service_requester;
					this.service_provider_permission = response.pdata.service_provider;
					this.service_dispatcher_permission = response.pdata.service_dispatcher;
          this.bookings_permission = response.pdata.bookings;
          this.zone_permission = response.pdata.zone;
          this.holidays_permission = response.pdata.holidays;
          this.query_service_permission = response.pdata.query_service;
          this.banner_management_permission = response.pdata.banner_management;
          this.notification_management_permission = response.pdata.notification_management;
				//	console.log('this.service_dispatcher_permission',this.service_dispatcher_permission);
				},
			(error) => {

			}
		);
  }
  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1024) {
        return true;
    } else {
        return false;
    }
  }
  isSmallScreen(){
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 1024) {
      this.sidenav.close();
    }
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

	ruleRoute(id) {
		//console.log(id);
		//this.router.navigateByUrl('/main/sr-booking-reschedule/'+id);
		this.router.navigateByUrl('/main/sr-booking-reschedule/'+id)
			.then(() => {
			window.location.reload();
		});
	}
}
