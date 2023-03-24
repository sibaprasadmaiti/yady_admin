import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-cms-management',
  templateUrl: './cms-management.component.html',
  styleUrls: ['./cms-management.component.scss']
})
export class CmsManagementComponent implements OnInit {
  public cmsList: any;
  logtoken = localStorage.getItem('LoginToken');
  changeStatusVal: any;
  constructor( public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef) {

    }

  ngOnInit() {
    this.cmsDetails();
  }

  public changeStatus(index: any, id: any, status: any) {
    this.spinnerService.show();
    // const updateUser = this.updateUser.value;
    // updateUser.id = this.id;
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status);
    if (status == 'Y') {this.changeStatusVal = 'N'; } else {this.changeStatusVal =  'Y' ; }
  
    this.adminservice.HttpPostReq (`admin/changeCmsStatus?token=${this.logtoken}`, formdata , true)
      .then(
        (response: any) => {
        
         // this.userList = response.data;
         this.cmsList[index].status = this.changeStatusVal;
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

  cmsDetails() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/cmslist?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.cmsList = response.data;
       this.spinnerService.hide();
       this.toastr.success(response.message)
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
    this.router.navigateByUrl('/main/addcontent');
  }
  editcontent(id: any){
    this.router.navigateByUrl(`/main/editcontent/${id}`);
  }

}
