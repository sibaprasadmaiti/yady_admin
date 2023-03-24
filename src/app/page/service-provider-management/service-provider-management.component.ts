import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';

@Component({
  selector: 'app-service-provider-management',
  templateUrl: './service-provider-management.component.html',
  styleUrls: ['./service-provider-management.component.scss']
})
export class ServiceProviderManagementComponent implements OnInit {

	imageSrc = '';
	showColor = false;
	showInfo = false;
	caption = 'Active';
	public serviceProviderList: any;
	public serviceProviderInfo: any;
	updateService: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	id: any;
	serviceProviderid: any;
	page = 1;
	changeStatusVal: any;
	imgSrc: any;
	name: null;
	email: null;
	imageButtons = [ {src: 'tickg.png', name: 'tickg'},
    {src: 'cross.png', name: 'cross'}]
  adminType: any = 0;
  city_id = "";
  state_id = "";
  country_id = "";

  constructor(public adminservice: ApiServiceService,
                private router: Router,
                public formbuilder: FormBuilder,
                public toastr: ToastrService,
                private spinnerService: Ng4LoadingSpinnerService,
                public snackBar: MatSnackBar,
                public matDialog: MatDialog) { }

  ngOnInit() {
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
        if(response.success){
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
        }else{
          this.toastr.error(response.message);
        }

      },
      (error) => {
        console.log("Error => ", error);
      }
    );
	  this.serviceProviderDetails(this.name,this.email);
  }
  public changeColor(): void {
    this.showColor = !this.showColor;
  }
  public changeData(id: any) {
	  this.showInfo = !this.showInfo;
	  if (this.showInfo) {
		  this.caption = 'Inactive';
	  } else {
		  this.caption = 'Active';
	  }
  }

    serviceProviderDetails(name: any, email: any) {
		this.spinnerService.show();
		if(name) {
			var user_name = name;
		} else {
			var user_name = undefined;
		}
		if(email) {
			var email = email;
		} else {
			var email = undefined;
		}
		this.adminservice.HttpGetReq(`admin/serviceProviderList?token=${this.logtoken}&user_name=${user_name}&email=${email}&city_id=${this.city_id}&state_id=${this.state_id}&country_id=${this.country_id}`, true)
		.then(
		  (response: any) => {
		   this.serviceProviderList = response.data;
		   this.spinnerService.hide();
		   this.toastr.success(response.message);

		  },
		 (error) => {
		  this.spinnerService.hide();
		  this.toastr.error('Internal server error');
		  this.snackBar.open('Internal server error', 'End now', {
			duration: 5000,
		  });
		 }
		)
   }

   public changeStatus(index: any, id: any, status: any) {
	   this.spinnerService.show();
    const formdata = new FormData();
    formdata.append('user_id', id);
    formdata.append('status', status);
    if (status == 1) {this.changeStatusVal = 0; } else {this.changeStatusVal =  1 ; }
    this.adminservice.HttpPostReq (`admin/changeUserStatus?token=${this.logtoken}`, formdata , true)
      .then(
        (response: any) => {
         this.serviceProviderList[index].status = this.changeStatusVal;
         this.spinnerService.hide();
         this.toastr.success(response.message);
        },
       (error) => {
        this.spinnerService.hide();
        this.toastr.error('Internal server error');
        this.snackBar.open('Internal server error', 'End now', {
          duration: 5000,
        });
       }
    )
   }

   searchUser(name: any, email: any) {
	  console.log(name);
	  console.log(email);
	  this.serviceProviderDetails(name,email);
  }

  reset_page() {
	  var name = undefined;
	  var email = undefined;
	  this.name = null;
	  this.email = null;
	  this.serviceProviderDetails(name,email);
  }

    setradius(sp_id: any) {
		this.router.navigateByUrl('/main/service-provider-radius/'+sp_id);
	}

  workingArea(sp_id: any){
    this.router.navigateByUrl('/main/service-provider-working-area/'+sp_id);
  }

  workingHour(sp_id: any){
    this.router.navigateByUrl('/main/service-provider-working-hours/'+sp_id);
  }
  spTransaction(sp_id: any){
    this.router.navigateByUrl('/main/service-provider-transaction/'+sp_id);
  }

  individual_percentage(sp_id: any){
    this.router.navigateByUrl('/main/service-provider-percentage/'+sp_id);
  }

  getWallet(sp_id: any){
    this.router.navigateByUrl('/main/user-wallet/'+sp_id+'/'+2);
  }
}
