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
  selector: 'app-zone-category-price-view',
  templateUrl: './zone-category-price-view.component.html',
  styleUrls: ['./zone-category-price-view.component.scss']
})
export class ZoneCategoryPriceViewComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	zonePriceViewData: any;
	cat_subcat_id;
	zone_price_id;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
              private router: Router,
              public formbuilder: FormBuilder,
              public toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) { }

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.cat_subcat_id = params.cat_subcat_id;
			this.zone_price_id = params.zone_price_id;
		});
	  this.zonePriceListView();
  }
  
	zonePriceListView() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/viewCatSubcatZonePrice/${this.cat_subcat_id}/${this.zone_price_id}/?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.zonePriceViewData = response.data;
				//console.log(this.zonePriceViewData);
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
		);
	}

}
