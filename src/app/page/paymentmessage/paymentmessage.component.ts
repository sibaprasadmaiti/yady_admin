import { Component, OnInit , ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
// tslint:disable-next-line:use-pipe-transform-interface

@Component({
  selector: 'app-paymentmessage',
  templateUrl: './paymentmessage.component.html',
  styleUrls: ['./paymentmessage.component.scss']
})
export class PaymentmessageComponent implements OnInit {
  public msgData: any;
  logtoken = localStorage.getItem('LoginToken');
  changeStatusVal: any;
  constructor(public adminservice: ApiServiceService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public toastr: ToastrService,
              public snackBar: MatSnackBar,
              public  vcr: ViewContainerRef) { }

  ngOnInit() {
    this.paymentmessagelistShow();
  }
  

   paymentmessagelistShow() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/adminpaymentmessagelist?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.msgData = response.data;
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
  }

  addNew() {
    console.log('hi....');
    this.router.navigateByUrl('/main/addpaymentmessage');
  }

  editfaq(id: any){
    this.router.navigateByUrl(`/main/editpaymentmessage/${id}`);
  }

}
