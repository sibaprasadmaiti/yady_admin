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
  selector: 'app-work-radius-edit',
  templateUrl: './work-radius-edit.component.html',
  styleUrls: ['./work-radius-edit.component.scss']
})
export class WorkRadiusEditComponent implements OnInit {
	
	public edit_id: any;
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	category_id_array:any = [];
	categoryData: any;
	isShown;

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
			this.edit_id = params.id;
		});
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/workRadiusById/${this.edit_id}/?token=${this.logtoken}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			console.log(response.data);
			this.EditForm.patchValue({
				radius: response.data.radius
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
		updatecontent.work_radius_id = this.edit_id;
		//console.log(updatecontent); return false;
		this.adminservice.HttpPostReq(`admin/updateWorkRadius?token=${this.logtoken}`, updatecontent, true)
		.then((response: any) => {
			if (response.success === true) {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
				this.router.navigateByUrl('/main/work-radius-list');
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
		}
		);
	}

}
