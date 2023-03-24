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
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss']
})
export class UserWalletComponent implements OnInit {

	public user_id: any;
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	user_type;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {


				this.EditForm = formbuilder.group({
					total_money: [''],
					money: ['', Validators.compose([Validators.required])],
					transaction_type: ['', Validators.compose([Validators.required])],
				});

			  }

  ngOnInit() {
	this.route.params.subscribe(params => {
		this.user_id = params.user_id;
		this.user_type = params.user_type;
	});
	this.getUserWallet(this.user_id)
  }

	getUserWallet(user_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getUserWallet/?token=${this.logtoken}&user_id=${user_id}`, true)
		.then((response: any) => {
			this.spinnerService.hide();
			if(response.success == true) {
				//console.log(response.data);
				this.EditForm.patchValue({
					total_money: response.data.total_money
				});
			} else {
				this.EditForm.patchValue({
					total_money: 0
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

	updateData() {
		const updatecontent = this.EditForm.value;
		updatecontent.user_id = this.user_id;
		updatecontent.user_type = this.user_type;

		console.log('updatecontent',updatecontent);
		//return false;

		this.adminservice.HttpPostReq(`admin/creditDebitWallet?token=${this.logtoken}`, updatecontent, true)
		.then((response: any) => {
			if (response.success === true) {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
				this.router.navigateByUrl('/main/user-wallet/'+this.user_id+'/'+this.user_type);
				this.getUserWallet(this.user_id)
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
  backtolist() {
    this.router.navigateByUrl('/main/service-requester-management');
  }

  walletTransaction(){
    this.router.navigateByUrl('/main/sr-sp-transaction-list/'+this.user_id+'/'+this.user_type);
  }

}
