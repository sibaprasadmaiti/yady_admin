import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-query-service-details',
  templateUrl: './query-service-details.component.html',
  styleUrls: ['./query-service-details.component.scss']
})
export class QueryServiceDetailsComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  servicedata: any;
  query_service_id: any;

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
      this.queryServiceDetails();
		});
  }

  queryServiceDetails(){
    this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/queryServiceDetails/?token=${this.logtoken}&query_service_id=${this.query_service_id}`, true)
		.then(
			(response: any) => {
        console.log("Query service details responce => ", response);

				if(response.success) {
          this.servicedata = response.data;
          this.spinnerService.hide();
          this.toastr.success(response.message);
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

  back() {
    this.router.navigateByUrl('/main/query-service-list');
}

}
