import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {

	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	zoneData: any;
  city_id = "";
  state_id = "";
  country_id = "";
  adminType = 0;

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
        this.zoneList(this.city_id);
      },
      (error) => {
        console.log("Error => ", error);
      }
    );

  }

	zoneList(city_id: any) {
		this.spinnerService.show();
    console.log("city id => ", city_id);
    console.log("state id => ", this.state_id);
    console.log("country id => ", this.country_id);
		this.adminservice.HttpGetReq(`admin/zoneList/?token=${this.logtoken}&city_id=${city_id}&state_id=${this.state_id}&country_id=${this.country_id}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.zoneData = response.data;
					console.log(this.zoneData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.zoneData = [];
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

	viewPlaces(zone_id) {
		this.router.navigateByUrl('/main/zone-places/'+zone_id);
	}
	zonePriceList(zone_id) {
		this.router.navigateByUrl('/main/zone-category-price-list/'+zone_id);
	}
	addNewZone() {
		this.router.navigateByUrl('/main/zone-add');
	}
	deleteZone(zone_id) {
		this.spinnerService.show();
		const addcontent = {
			zone_id: zone_id
		}
		this.adminservice.HttpPostReq(`admin/deleteZone?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				this.zoneList(this.city_id);
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
