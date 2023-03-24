import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-query-service-assign-details',
  templateUrl: './query-service-assign-details.component.html',
  styleUrls: ['./query-service-assign-details.component.scss']
})
export class QueryServiceAssignDetailsComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  query_service_assign_id: any;
  query_service_assign_details:any;
  adminApproval = 0;

  constructor(private route: ActivatedRoute,
    public adminservice: ApiServiceService,
    private router: Router,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
			this.query_service_assign_id = params.query_service_assign_id;
      this.queryServiceAssignDetails();
		});
  }

  queryServiceAssignDetails(){
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/queryServiceAssignDetails/?token=${this.logtoken}&query_service_assign_id=${this.query_service_assign_id}`, true)
      .then(
        (response: any) => {
          console.log("Query service assign list => ", response);

          if (response.success) {
            this.query_service_assign_details = response.data;
            this.spinnerService.hide();
            this.toastr.success(response.message);
          } else {
            this.query_service_assign_details = {};
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

  back(query_service_id: any) {
    this.router.navigateByUrl('/main/query-service-assign-list/'+query_service_id);
}

approveQuery(){
  this.spinnerService.show();
  this.adminservice.HttpGetReq(`admin/queryApprove/?token=${this.logtoken}&query_service_assign_id=${this.query_service_assign_id}`, true)
    .then(
      (response: any) => {
        console.log("Query service approval => ", response);

        if (response.success) {
          this.spinnerService.hide();
          this.toastr.success(response.message);
          this.adminApproval = 1;
        } else {
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

}
