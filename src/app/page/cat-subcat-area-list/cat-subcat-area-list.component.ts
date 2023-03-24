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
  selector: 'app-cat-subcat-area-list',
  templateUrl: './cat-subcat-area-list.component.html',
  styleUrls: ['./cat-subcat-area-list.component.scss']
})
export class CatSubcatAreaListComponent implements OnInit {

	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	areaData: any;
	cat_id;
	subcat_id;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
              private router: Router,
              public formbuilder: FormBuilder,
              public toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) { }

  ngOnInit() {
	  this.route.params.subscribe(params => {
			this.cat_id = params.cat_id;
			this.subcat_id = params.subcat_id;
		});
	  this.catSubcatAreaList();
  }

	catSubcatAreaList() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/catSubcatAreaList/${this.cat_id}/${this.subcat_id}/?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.areaData = response.data;
					console.log(this.areaData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.areaData = [];
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

	viewPlaces(area_id) {
		this.router.navigateByUrl('/main/cat-subcat-area-places/'+area_id);
	}

	deleteArea(area_id) {
		this.spinnerService.show();
		const addcontent = {
			area_id: area_id
		}
		this.adminservice.HttpPostReq(`admin/deleteArea?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				this.catSubcatAreaList();
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

	addNewArea() {
		this.router.navigateByUrl('/main/cat-subcat-area/'+this.cat_id+'/'+this.subcat_id);
	}

	back() {
		if(this.subcat_id == 'none') {
			this.router.navigateByUrl('/main/category-list');
		} else {
			this.router.navigateByUrl('/main/sub-category-list/'+this.cat_id);
		}
	}

}
