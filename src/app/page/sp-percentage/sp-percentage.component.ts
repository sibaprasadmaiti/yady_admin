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
  selector: 'app-sp-percentage',
  templateUrl: './sp-percentage.component.html',
  styleUrls: ['./sp-percentage.component.scss']
})
export class SpPercentageComponent implements OnInit {
	
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	service_provider_id;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { 
			  
				this.EditForm = formbuilder.group({
					sp_individual_hourly_percentage: ['', Validators.compose([Validators.required])],
					sp_individual_fixed_percentage: ['', Validators.compose([Validators.required])],
					sp_individual_query_percentage: ['', Validators.compose([Validators.required])],
				});
			  }

    ngOnInit() {
		this.route.params.subscribe(params => {
			this.service_provider_id = params.service_provider_id;
		});
	  this.getSpDetails(this.service_provider_id)
    }
	
	getSpDetails(sp_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getUserById/${sp_id}/?token=${this.logtoken}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			this.EditForm.patchValue({
				sp_individual_hourly_percentage: response.data.sp_individual_hourly_percentage,
				sp_individual_fixed_percentage: response.data.sp_individual_fixed_percentage,
				sp_individual_query_percentage: response.data.sp_individual_query_percentage,
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
		updatecontent.user_id = this.service_provider_id;
		console.log('updatecontent',updatecontent);
		this.adminservice.HttpPostReq(`admin/updateSPPercentage?token=${this.logtoken}`, updatecontent, true)
		.then((response: any) => {
			if (response.success === true) {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
				this.router.navigateByUrl('/main/service-provider-percentage/'+this.service_provider_id);
			} else {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
			}
		},
		(error) => {
			this.spinnerService.hide();
			this.snackBar.open('Internal server error', 'End now', {
				duration: 5000,
			});
		});
	}

}
