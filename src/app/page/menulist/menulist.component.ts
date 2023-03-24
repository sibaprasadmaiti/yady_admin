import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {
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
  menuData: any;
  imageButtons = [ {src: 'tickg.png', name: 'tickg'},
   {src: 'cross.png', name: 'cross'}];
   public imgpath: any;
   public defaultimg: any;
  constructor(public adminservice: ApiServiceService,
              private router: Router,
              public formbuilder: FormBuilder,
              public toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) { 
                this.imgpath = environment.api_url+'public/menuimg/';
                this.defaultimg = environment.api_url+'public/menuimg/no_image.png';
              }

  ngOnInit() {
    this.menulistShow();
  }

  addNew() {
    console.log('hi....');
    this.router.navigateByUrl('/main/addmenu');
  }

  menulistShow() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/menulist?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.menuData = response.data;
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

  public changeStatus(index: any, id: any, status: any) {
    this.spinnerService.show();
    // const updateUser = this.updateUser.value;
    // updateUser.id = this.id;
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status);
    if (status == 'Y') {this.changeStatusVal = 'N'; } else {this.changeStatusVal =  'Y' ; }
    this.adminservice.HttpPostReq (`admin/changeMenuStatus?token=${this.logtoken}`, formdata , true)
      .then(
        (response: any) => {

         // this.userList = response.data;
         this.menuData[index].status = this.changeStatusVal;
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

  editMenu(id: any){
    this.router.navigateByUrl(`/main/editmenu/${id}`);
  }
}
