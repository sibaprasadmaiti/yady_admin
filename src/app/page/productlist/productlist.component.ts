import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  public product: any;
  public userInfo: any;
  logtoken = localStorage.getItem('LoginToken');
  id: any;
  page = 1;
   public search = '';
  public imgpath: any;
  public defaultimg: any;
  constructor(  public adminservice: ApiServiceService,
                private router: Router,
                public toastr: ToastrService,
                private spinnerService: Ng4LoadingSpinnerService,
                public snackBar: MatSnackBar,
                public matDialog: MatDialog) {
                  this.imgpath = environment.api_url+'public/productimage/';
                  this.defaultimg = environment.api_url+'public/productimage/default-book.png';
                 }

  ngOnInit() {
    this.productList();
  }


  productList() {
    this.adminservice.HttpGetReq(`admin/productlist?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.product = response.data;
       console.log('<><><><>', response.data);
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
  onSearchChange(searchValue: string): void {
    // console.log(searchValue);
    this.search = searchValue;
    const formdata = new FormData();
    formdata.append('searchby', this.search);
    this.adminservice.HttpPostReq(`admin/productsearch?token=${this.logtoken}`, formdata, true)
    .then(
      (response: any) => {
       this.product = response.data;
       this.spinnerService.hide();
       // this.toastr.success(response.message);

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
