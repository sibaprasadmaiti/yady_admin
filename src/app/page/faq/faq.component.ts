import { Component, OnInit , ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
// tslint:disable-next-line:use-pipe-transform-interface

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public faqData: any;
  logtoken = localStorage.getItem('LoginToken');
  changeStatusVal: any;
  constructor(public adminservice: ApiServiceService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public toastr: ToastrService,
              public snackBar: MatSnackBar,
              public  vcr: ViewContainerRef) { }

  ngOnInit() {
    this.faqlistShow();
  }
  clickMethod(id: string, index: string) {
    // if (confirm('Are you sure to delete ' + id + index)) {
     if (confirm('Are you sure you want to delete faq ?')) {
      // console.log("Implement delete functionality here");
         this.removefaq(id , index);
     }
   }

  public changeStatus(index: any, id: any, status: any) {
    this.spinnerService.show();
    // const updateUser = this.updateUser.value;
    // updateUser.id = this.id;
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status);
    if (status == 'Y') {this.changeStatusVal = 'N'; } else {this.changeStatusVal =  'Y' ; }
    this.adminservice.HttpPostReq (`admin/changeFaqStatus?token=${this.logtoken}`, formdata , true)
      .then(
        (response: any) => {

         // this.userList = response.data;
         this.faqData[index].status = this.changeStatusVal;
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
    )

  }

  public removefaq( id: any, index: any ) {
    this.spinnerService.show();
    // const updateUser = this.updateUser.value;
    // updateUser.id = this.id;
    const formdata = new FormData();
    formdata.append('id', id);
    this.adminservice.HttpPostReq (`admin/removefaq?token=${this.logtoken}`, formdata, true )
      .then(
        (response: any) => {

         // this.userList = response.data;
         // this.homeCategoryList[index].status = this.changeStatusVal;
         this.faqData.splice(index, 1);
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
    )

  }


  faqlistShow() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/faqlist?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.faqData = response.data;
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
    this.router.navigateByUrl('/main/addfaq');
  }

  editfaq(id: any){
    this.router.navigateByUrl(`/main/editfaq/${id}`);
  }

}
