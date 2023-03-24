import { Component, OnInit , ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-homecategory',
  templateUrl: './homecategory.component.html',
  styleUrls: ['./homecategory.component.scss']
})
export class HomecategoryComponent implements OnInit {
  public homeCategoryList: any;
  logtoken = localStorage.getItem('LoginToken');
  changeStatusVal: any;
  constructor(public adminservice: ApiServiceService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public toastr: ToastrService,
              public snackBar: MatSnackBar,
              public  vcr: ViewContainerRef) { }


  ngOnInit() {
    // this.ngconfirm.show(this.bgColor, this.confirmHeading, this.confirmContent, this.confirmCanceltext, this.confirmOkaytext);
    this.homeCatgorylist();
  }
  clickMethod(id: string, index: string) {
   // if (confirm('Are you sure to delete ' + id + index)) {
    if (confirm('Are you sure you want to delete home category ?')) {
     // console.log("Implement delete functionality here");
        this.removehomecategory(id , index);
    }
  }


  public removehomecategory( id: any, index: any ) 
  {

    this.spinnerService.show();
    // const updateUser = this.updateUser.value;
    // updateUser.id = this.id;
    const formdata = new FormData();
    formdata.append('id', id);
    this.adminservice.HttpPostReq (`admin/removeHomeCategory?token=${this.logtoken}`, formdata, true )
      .then(
        (response: any) => {

         // this.userList = response.data;
         // this.homeCategoryList[index].status = this.changeStatusVal;
         this.homeCategoryList.splice(index, 1);
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

  public changeStatus(index: any, id: any, status: any) {
    this.spinnerService.show();
    // const updateUser = this.updateUser.value;
    // updateUser.id = this.id;
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status);
    if (status == 'Y') {this.changeStatusVal = 'N'; } else {this.changeStatusVal =  'Y' ; }
    this.adminservice.HttpPostReq (`admin/changeHomeCatStatus?token=${this.logtoken}`, formdata , true)
      .then(
        (response: any) => {

         // this.userList = response.data;
         this.homeCategoryList[index].status = this.changeStatusVal;
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

  homeCatgorylist() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/homecategorylist?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.homeCategoryList = response.data;
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
    this.router.navigateByUrl('/main/addhomecategory');
  }
  edithomecategory(id: any){
    this.router.navigateByUrl(`/main/edithomecategory/${id}`);
  }

}
