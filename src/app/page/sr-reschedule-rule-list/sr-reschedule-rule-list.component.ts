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
  selector: 'app-sr-reschedule-rule-list',
  templateUrl: './sr-reschedule-rule-list.component.html',
  styleUrls: ['./sr-reschedule-rule-list.component.scss']
})
export class SrRescheduleRuleListComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	ruleData: any;

  constructor(public adminservice: ApiServiceService,
              private router: Router,
              public formbuilder: FormBuilder,
              public toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) { }

  ngOnInit() {
	  this.ruleList();
  }
  
	ruleList() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getRescheduleList/?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				if(response.success == true) {
					this.ruleData = response.data;
					console.log('this.ruleData',this.ruleData);
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.ruleData = [];
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
	
	editRule(rule_id) {
		this.router.navigateByUrl('/main/sr-booking-reschedule/'+rule_id);
	}

}
