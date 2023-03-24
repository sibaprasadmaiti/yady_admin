import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-approve-change-request-query-service',
  templateUrl: './approve-change-request-query-service.component.html',
  styleUrls: ['./approve-change-request-query-service.component.scss']
})
export class ApproveChangeRequestQueryServiceComponent implements OnInit {
  changeForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  query_booking_id: any;

  constructor(private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    public toastr: ToastrService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar) {
       this.changeForm = formbuilder.group({
      user_given_amount: ['', Validators.compose([Validators.required])],
      change_amount: ['', Validators.compose([Validators.required])],
    });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.query_booking_id = params.query_booking_id;
    });
    this.getChangeRequest();
  }

  backtolist() {
    this.router.navigateByUrl('/main/query-booking-list');
  }

  getChangeRequest() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/getChangeRequestForQueryService/?token=${this.logtoken}&query_booking_id=${this.query_booking_id}`, true)
      .then((response: any) => {
        this.spinnerService.hide();
        if (response.success == true) {
          this.changeForm.patchValue({
            user_given_amount: response.data.user_given_amount,
            change_amount: response.data.change_amount
          });
        } else {
          this.toastr.error(response.message);
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

  approveChangeRequest() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/approveChangeRequestForQueryService/?token=${this.logtoken}&query_booking_id=${this.query_booking_id}`, true)
      .then((response: any) => {
        this.spinnerService.hide();
        if (response.success == true) {
          this.toastr.success(response.message);
          this.router.navigateByUrl('/main/query-booking-list');
        } else {
          this.toastr.error(response.message);
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
