import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-query-service-assign-list',
  templateUrl: './query-service-assign-list.component.html',
  styleUrls: ['./query-service-assign-list.component.scss']
})
export class QueryServiceAssignListComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  query_service_id: any;
  serviceAssignList: any;
  page = 1;

  constructor(private route: ActivatedRoute,
    public adminservice: ApiServiceService,
    private router: Router,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.query_service_id = params.service_id;
      this.queryServiceAssignList();
    });
  }

  queryServiceAssignList() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/queryServiceAssignListById/?token=${this.logtoken}&query_service_id=${this.query_service_id}`, true)
      .then(
        (response: any) => {
          console.log("Query service assign list => ", response);

          if (response.success) {
            this.serviceAssignList = response.data;
            this.spinnerService.hide();
            this.toastr.success(response.message);
          } else {
            this.serviceAssignList = [];
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
  back() {
    this.router.navigateByUrl('/main/query-service-list');
}

viewDetails(query_service_assign_id: any){
  this.router.navigateByUrl('/main/query-service-assign-details/' + query_service_assign_id);
}

}
