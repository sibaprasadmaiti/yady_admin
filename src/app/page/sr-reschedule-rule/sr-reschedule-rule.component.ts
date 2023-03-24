import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sr-reschedule-rule',
  templateUrl: './sr-reschedule-rule.component.html',
  styleUrls: ['./sr-reschedule-rule.component.scss']
})
export class SrRescheduleRuleComponent implements OnInit {
	
	public edit_id: any;
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	reschedule_id;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { 
			  
					this.EditForm = formbuilder.group({
						amount_percentage: ['', Validators.compose([Validators.required])],
						rule_name: ['']
					});
			  
			  }

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.reschedule_id = params.reschedule_id;
		});
		this.getRescheduleDetails();
  }
  
	getRescheduleDetails() {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getRescheduleDetails/?token=${this.logtoken}&reschedule_id=${this.reschedule_id}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			console.log(response.data);
			this.EditForm.patchValue({
				amount_percentage: response.data.amount_percentage,
				rule_name: response.data.rule_name
			});
		},
		(error) => {
			this.spinnerService.hide();
				this.snackBar.open('Internal server error', 'End now', {
					duration: 5000,
				});
			}
		);
	}
	
	updateData() {
		this.spinnerService.show();
		const updatecontent = this.EditForm.value;
		updatecontent.reschedule_id = this.reschedule_id;
		//console.log(updatecontent); return false;
		this.adminservice.HttpPostReq(`admin/saveReschedule?token=${this.logtoken}`, updatecontent, true)
		.then((response: any) => {
			if (response.success === true) {
				this.spinnerService.hide();
				this.toastr.success(response.message);
			} else {
				this.spinnerService.hide();
				this.toastr.success(response.message);
			}
		},
		(error) => {
			this.spinnerService.hide();
		}
		);
	}
	
	back() {
		this.router.navigateByUrl('/main/sr-reschedule-rule-list');
	}

}
