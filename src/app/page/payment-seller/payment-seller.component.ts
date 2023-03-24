import { Component, OnInit , ViewContainerRef } from '@angular/core';
// import { IPayPalConfig } from 'ngx-paypal';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';


// import { NgxPayPalModule } from 'ngx-paypal';


@Component({
  selector: 'app-payment-seller',
  templateUrl: './payment-seller.component.html',
  styleUrls: ['./payment-seller.component.scss']
})
export class PaymentSellerComponent implements OnInit {
  public sellerPaymentListData: any;
  // tslint:disable-next-line:variable-name
  public or_id: any;
  logtoken = localStorage.getItem('LoginToken');
  changeStatusVal: any;
  id: any;
  page = 1;
  // public payPalConfig ? : IPayPalConfig;
  constructor(public adminservice: ApiServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private spinnerService: Ng4LoadingSpinnerService,
              public toastr: ToastrService,
              public snackBar: MatSnackBar,
              public  vcr: ViewContainerRef
               ) { }

  ngOnInit() {
    this.toastr.success('');
    this.sellerPaymentList();
  }
  sellerPaymentList() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/sellerPaymentlist?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.sellerPaymentListData = response.data;
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

  paynow() {

  }

}
