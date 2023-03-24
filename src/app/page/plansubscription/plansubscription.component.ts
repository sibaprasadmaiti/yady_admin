import { Component, OnInit , ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-plansubscription',
  templateUrl: './plansubscription.component.html',
  styleUrls: ['./plansubscription.component.scss']
})
export class PlansubscriptionComponent implements OnInit {
  public planSubscriptionListData: any;
  logtoken = localStorage.getItem('LoginToken');
  constructor(public adminservice: ApiServiceService,
              private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef) { }

  ngOnInit() {
    this.plansubscriptionlist();
  }

  plansubscriptionlist() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/plansubscription?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.planSubscriptionListData = response.data;
       this.spinnerService.hide();
       this.toastr.success(response.message);
      },
     (error) => {
      this.spinnerService.hide();
      this.toastr.error('Internal server error');
      this.snackBar.open('Internal server error', 'End now', {
        duration: 5000,
      });
     }
   );

  //  addNew() {
  //   console.log('hi....');
  //   this.router.navigateByUrl('/main/addplan');
  // }
  

  }

  editplan(id: any) {
    this.router.navigateByUrl(`/main/editplan/${id}`);
  }
  addNew() {
      console.log('hi....');
       this.router.navigateByUrl('/main/addplan');
     }

}
