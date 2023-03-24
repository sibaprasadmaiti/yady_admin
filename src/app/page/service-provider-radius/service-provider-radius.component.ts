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
  selector: 'app-service-provider-radius',
  templateUrl: './service-provider-radius.component.html',
  styleUrls: ['./service-provider-radius.component.scss']
})
export class ServiceProviderRadiusComponent implements OnInit {
	
	public edit_id: any;
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	sp_id;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { 
			  
					this.EditForm = formbuilder.group({
						radius: ['', Validators.compose([Validators.required])]
					});
			  }

  ngOnInit() {
	  this.route.params.subscribe(params => {
			this.sp_id = params.sp_id;
		});
		
		this.getSpRadius(this.sp_id)
  }
  
	getSpRadius(sp_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getUserById/${sp_id}/?token=${this.logtoken}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			this.EditForm.patchValue({
				radius: response.data.individual_radius
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
		updatecontent.user_id = this.sp_id;
		this.adminservice.HttpPostReq(`admin/updateSPWorkRadius?token=${this.logtoken}`, updatecontent, true)
		.then((response: any) => {
			if (response.success === true) {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
				this.router.navigateByUrl('/main/service-provider-radius/'+this.sp_id);
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
