import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-query-service-list',
  templateUrl: './query-service-list.component.html',
  styleUrls: ['./query-service-list.component.scss']
})
export class QueryServiceListComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  queryServiceListData: any;
  page = 1;
  adminType = 0;
  a_status = 0;

  constructor(public adminservice: ApiServiceService,
    private router: Router,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.queryServiceList(this.a_status);

    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          if(response.success){
            this.adminType = response.data.admin_type;
          }else{
            this.toastr.error(response.message);
          }

        },
        (error) => {
          console.log("Error => ", error);
        }
      );
  }

  queryServiceList(sts){
	  console.log('sts',sts);
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/queryServiceList/?token=${this.logtoken}&assign_status=${sts}`, true)
      .then(
        (response: any) => {
          console.log("Query service responce => ", response);

          if(response.success){
            this.queryServiceListData = response.data;
            this.spinnerService.hide();
            this.toastr.success(response.message);
          }else{
            this.queryServiceListData = [];
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

  viewDetails(service_id: any){
    this.router.navigateByUrl('/main/query-service-details/' + service_id);
  }

  assignToSp(service_id: any){
    this.router.navigateByUrl('/main/assign-query-service/' + service_id);
  }

  spAssignList(service_id: any){
    this.router.navigateByUrl('/main/query-service-assign-list/' + service_id);
  }

  searchBookingByStatus(sts) {
	  if(sts == 'assign') {
		  this.queryServiceList(0);
	  } else if(sts == 'approve') {
		  this.queryServiceList(1);
	  }
  }

}
