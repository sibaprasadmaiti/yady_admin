import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
// import { ModalManager } from 'ngb-modal';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.component.html',
  styleUrls: ['./rating-review.component.scss']
})
export class RatingReviewComponent implements OnInit {
  @ViewChild('auto', { static: false }) auto;
  // @ViewChild('contentmood', {static: false}) contentmood: ElementRef;
  // @ViewChild('contentmood', {static: false}) contentmood;
  // @ViewChild('myModal', { static: false }) myModal;

  private modalRef;
  public ratingreviewListData: any;
  public driverData: any;
  modalReference = null;
  closeResult = '';
  // tslint:disable-next-line:variable-name
  public or_id: any;
  logtoken = localStorage.getItem('LoginToken');
  changeStatusVal: any;
  id: any;
  page = 1;
  public imgpath: any;
  public defaultimg: any;
  custom: any;
  orderid: any;
  itemid: any;
  removedriver: any;
  driverid: any;

  max = 5;
  currentRate = 0;
  rating3: number;

  showShortDesciption = true;
  value = ' More';
  constructor(
    public adminservice: ApiServiceService,
    private router: Router,
    //  private modalService: NgbModal,
    private renderer2: Renderer2,
    // private modalService: ModalManager,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public vcr: ViewContainerRef) {
      this.imgpath = environment.api_url + 'public/menuimg/';
      this.defaultimg = environment.api_url + 'public/menuimg/no_image.png';  
     }

  ngOnInit() {
    this.ratingreviewlist();
    this.rating3 = 3;
    this.value = 'More';
  }

  ratingreviewlist() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/review-ratinglist?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.ratingreviewListData = response.data;
          console.log('<this.transactionListData>', this.ratingreviewListData);
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
    if (status == '1') {this.changeStatusVal = '0'; } else {this.changeStatusVal =  '1' ; }
    this.adminservice.HttpPostReq (`admin/changeReviewRatingStatus?token=${this.logtoken}`, formdata , true)
      .then(
        (response: any) => {

         // this.userList = response.data;
         this.ratingreviewListData[index].reviewStatus = this.changeStatusVal;
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

  alterDescriptionText() {
    console.log('dfddfg', this.showShortDesciption);
    this.showShortDesciption = !this.showShortDesciption;
    if (this.showShortDesciption === true) {
      console.log(1);
      this.value = 'More';
    } else if (this.showShortDesciption === false){
      console.log(2);
      this.value = 'Less';
    }
 }

}
