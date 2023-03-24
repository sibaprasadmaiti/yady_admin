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
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.scss']
})
export class VideolistComponent implements OnInit {
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
  videoData: any;
  imageButtons = [ {src: 'tickg.png', name: 'tickg'},
   {src: 'cross.png', name: 'cross'}];
   public imgpath: any;
   public videopath: any;
   public defaultimg: any;
   constructor(
     public adminservice: ApiServiceService,
    private router: Router,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) {
      this.videopath = environment.api_url + 'public/video/';
      this.imgpath = environment.api_url + 'public/video/thumb/';
      this.defaultimg = environment.api_url + 'public/video/no_image.png';
    }

  ngOnInit() {
    this.videolistShow();
  }
  addNew() {
    console.log('hi....');
    this.router.navigateByUrl('/main/addvideo');
  }

  videolistShow() {


    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/videolist?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
        console.log('video response', response);
        this.videoData = response.data;
        this.spinnerService.hide();
        this.toastr.success();
      //  this.toastr.success(response.message);
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
    console.log('<<>>', this.changeStatusVal);
    // const updateUser = this.updateUser.value;
    // updateUser.id = this.id;
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status);
    if (status == 'Y') {this.changeStatusVal = 'N'; } else {this.changeStatusVal =  'Y' ; }
    this.adminservice.HttpPostReq (`admin/changevideoStatus?token=${this.logtoken}`, formdata , true)
      .then(
        (response: any) => {

         // this.userList = response.data;
         this.videoData[index].status = this.changeStatusVal;
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

  editMenu(id: any) {
    /*console.log('<<<id', id);
     this.router.navigateByUrl(`/main/editvideo/${id}`);*/
  }
  toggleVideo(){
    
  }

}
