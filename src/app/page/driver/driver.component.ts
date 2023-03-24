import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  imageSrc = '';
  showColor = false;
  showInfo = false;
  caption = 'Active';
  public userList: any;
  public userInfo: any;
  updateUser: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  id: any;
  page = 1;
  changeStatusVal: any;
  imgSrc: any;
  imageButtons = [ {src: 'tickg.png', name: 'tickg'},
   {src: 'cross.png', name: 'cross'}];
  constructor(public adminservice: ApiServiceService,
    private router: Router,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

    ngOnInit() {
      this.driverList();
    }
    public changeColor(): void {
      this.showColor = !this.showColor;
  }
  public changeData(id: any) {
    this.showInfo = !this.showInfo;
    if (this.showInfo) {
        this.caption = 'Inactive';
    } else {
        this.caption = 'Active';
    }
  }

  public changeStatus(index: any, id: any, status: any) {
    this.spinnerService.show();
    // const updateUser = this.updateUser.value;
    // updateUser.id = this.id;
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status);
  if(status== 0) {this.changeStatusVal =1;}
  else{this.changeStatusVal = 0;}

    this.adminservice.HttpPostReq (`admin/changeUserStatus?token=${this.logtoken}`, formdata , true)
      .then(
        (response: any) => {

         // this.userList = response.data;
         this.userList[index].status = this.changeStatusVal;
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
  driverList() {
      this.adminservice.HttpGetReq(`admin/driverlist?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
         this.userList = response.data;
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


    editUser() {
      console.log('edit user');
    }
    viewtuser(id: any) {
      this.router.navigateByUrl(`/main/viewuser/${id}`);
    }

    viewNotification(id: any) {
      console.log('id:::',id);
      this.router.navigateByUrl(`/main/viewemailnotification/${id}`);
    }
    viewContactNotification(){
      this.router.navigateByUrl(`/main/viewcustomermessage`);
    }

    viewTransction(id: any){
      this.router.navigateByUrl(`/main/orderlist/${id}`);
    }

    addNew() {
      console.log('hi....');
      this.router.navigateByUrl('/main/adddriver');
    }

    openModal(id: any) {
      this.adminservice.HttpGetReq(`admin/userinfo/${id}/?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
         this.userInfo = response.data;
         this.spinnerService.hide();
         // this.toastr.success(response.message);
         const dialogConfig = new MatDialogConfig();
         // The user can't close the dialog by clicking outside its body
         dialogConfig.disableClose = true;
         dialogConfig.id = "modal-component";
         dialogConfig.height = "350px";
         dialogConfig.width = "600px";
         dialogConfig.data = {
           name: this.userInfo[0].name,
           to: this.userInfo[0].email,
           flag: '1',
           // title: "Are you sure you want to logout?",
           // description: "Pretend this is a convincing argument on why you shouldn't logout :)",
           // actionButtonText: "Logout",
         };
         // https://material.angular.io/components/dialog/overview
         const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);


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


    openChangePasswordModal(id: any) {
      this.adminservice.HttpGetReq(`admin/userinfo/${id}/?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
         this.userInfo = response.data;
         this.spinnerService.hide();
         // this.toastr.success(response.message);
         const dialogConfig2 = new MatDialogConfig();
         // The user can't close the dialog by clicking outside its body
         dialogConfig2.disableClose = true;
         dialogConfig2.id = "modal-component";
         dialogConfig2.height = "350px";
         dialogConfig2.width = "600px";
         dialogConfig2.data = {
           name: this.userInfo[0].name,
           to: this.userInfo[0].email,
           flag: '2',
           // title: "Are you sure you want to logout?",
           // description: "Pretend this is a convincing argument on why you shouldn't logout :)",
           // actionButtonText: "Logout",
         };
         // https://material.angular.io/components/dialog/overview
         const modalDialog = this.matDialog.open(ModalComponent, dialogConfig2);


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
