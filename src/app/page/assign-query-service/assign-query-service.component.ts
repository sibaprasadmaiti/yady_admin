import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';

@Component({
  selector: 'app-assign-query-service',
  templateUrl: './assign-query-service.component.html',
  styleUrls: ['./assign-query-service.component.scss']
})
export class AssignQueryServiceComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  addForm: FormGroup;
  service_id: any;
  spDetails: any;
  error_msg: any;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public formbuilder: FormBuilder) {
      this.addForm = formbuilder.group({
        service_provider_array: ['',Validators.compose([Validators.required])],
      });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
			this.service_id = params.service_id;
      this.getSPForQueryService();
		});
  }

  getSPForQueryService(){
    this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getSPForQueryService/?token=${this.logtoken}&query_service_id=${this.service_id}`, true)
		.then(
			(response: any) => {
				console.log("Sp list for query service responce => ", response);
				if(response.success == true) {
					this.spDetails = response.data;
          this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.spDetails = [];
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

  assignSP() {
		const addcontent = this.addForm.value;
		addcontent.query_service_id = this.service_id;
    console.log(addcontent);

		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/assignQueryServiceToSP?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
        console.log("assign query service save responce => ", response);
        if(response.success){
          this.spinnerService.hide();
          this.toastr.success(response.message);
          this.router.navigateByUrl('/main/query-service-list');
        }else{
          this.spinnerService.hide();
          this.error_msg = response.message;
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

  back() {
    this.router.navigateByUrl('/main/query-service-list');
}

}
