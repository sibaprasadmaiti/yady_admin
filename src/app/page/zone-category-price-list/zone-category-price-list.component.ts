import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-zone-category-price-list',
  templateUrl: './zone-category-price-list.component.html',
  styleUrls: ['./zone-category-price-list.component.scss']
})
export class ZoneCategoryPriceListComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	zonePriceData: any;
	zone_id;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
              private router: Router,
              public formbuilder: FormBuilder,
              public toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) { }

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.zone_id = params.zone_id;
		});
	  this.zonePriceList();
  }
  
	zonePriceList() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/zoneCatSubcatPriceList/${this.zone_id}/?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.zonePriceData = response.data;
					//console.log(this.zonePriceData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.zonePriceData = [];
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
	
	viewPrices(cat_subcat_id,zone_price_id) {
		this.router.navigateByUrl('/main/zone-category-price-view/'+cat_subcat_id+'/'+zone_price_id);
	}
	
	zoneCatSubcatAdd() {
		this.router.navigateByUrl('/main/zone-category-add/'+this.zone_id);
	}
	
	deleteZoneCatSubcat(zone_cat_subcat_id) {
		this.spinnerService.show();
		const addcontent = {
			zone_cat_subcat_id: zone_cat_subcat_id
		}
		this.adminservice.HttpPostReq(`admin/deleteZoneCatSubcat?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				this.zonePriceList();
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
	
	zoneList() {
		this.router.navigateByUrl('/main/zone-list');
	}
	edit(id) {
		this.router.navigateByUrl('/main/zone-category-edit/'+id);
	}

}
