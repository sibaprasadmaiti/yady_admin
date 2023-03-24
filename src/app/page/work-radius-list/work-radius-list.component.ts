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
  selector: 'app-work-radius-list',
  templateUrl: './work-radius-list.component.html',
  styleUrls: ['./work-radius-list.component.scss']
})
export class WorkRadiusListComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	showColor = false;
	showInfo = false;
	radiusData: any;
	imageButtons = [ {src: 'tickg.png', name: 'tickg'},
	{src: 'cross.png', name: 'cross'}];

  constructor(public adminservice: ApiServiceService,
              private router: Router,
              public formbuilder: FormBuilder,
              public toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) { }

  ngOnInit() {
	  this.workRadiusList();
  }
  
  workRadiusList() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/WorkRadiusList/?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.radiusData = response.data;
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
	
	editRadius(id: any) {
		this.router.navigateByUrl('/main/work-radius-edit/'+id);
	}

}
