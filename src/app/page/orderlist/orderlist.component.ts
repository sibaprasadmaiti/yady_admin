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
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {
  @ViewChild('auto', { static: false }) auto;
  // @ViewChild('contentmood', {static: false}) contentmood: ElementRef;
  // @ViewChild('contentmood', {static: false}) contentmood;
  // @ViewChild('myModal', { static: false }) myModal;

  private modalRef;
  public transactionListData: any;
  public driverData: any;
  public itemListData: any;
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
  custom2:any;
  orderid: any;
  itemid: any;
  removedriver: any;
  driverid: any;
  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'Usa'
    },
    {
      id: 2,
      name: 'England'
    }
  ];

  constructor(public adminservice: ApiServiceService,
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

    // this.modalService.setDefaults({
    //   title: 'new modal',
    //   size: 'sm',
    //   modalClass: 'mymodal',
    //   hideCloseButton: true,
    //   centered: false,
    //   backdrop: true,
    //   animation: true,
    //   keyboard: true,
    //   closeOnOutsideClick: true,
    //   backdropClass: 'modal-backdrop'
    // });
    // this.modalService.setRootViewContainerRef(this.vcr);
  }

  ngOnInit() {
    this.custom = 'custom-model';
	this.custom2 = 'custom2-model';
    this.toastr.success('');
    this.route.params.subscribe(params => {
      this.or_id = params.or_id;
    });
    // this.transactionlist();
    if (this.or_id > 0) {
      // this.transactionlist();
      console.log('ff');
      this.transactionlistByUser();
    } else {
      // this.transactionlistByUser();
      this.transactionlist();
      console.log('ghhgjgh');
    }

  }

  transactionlist() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/orderlist?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.transactionListData = response.data;
          console.log('<this.transactionListData>', this.transactionListData);
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

  transactionlistByUser() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/orderlistbyUser/${this.or_id}/?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.transactionListData = response.data;
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

  assignDriver(order: any) {
    this.onClosedAuto();
    console.log('gfgf');
    console.log('order id', order);
    //console.log('itemid id', itemid);
    this.orderid = order;
    //this.itemid = itemid;
    // this.renderer2.addClass(event.target,"custom-model show")
    // event.srcElement.classList.add("custom-model show");
    this.custom = 'custom-model show';
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/assgndriverlist/?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.driverData = response.data;
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
  
  
  viewItems(order_id: any) {
    this.orderid = order_id;
    this.custom2 = 'custom2-model show';
	this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/orderDetails/?token=${this.logtoken}&order_id=${this.orderid}`, true)
      .then(
        (response: any) => {
          this.itemListData = response.data;
          console.log('<this.itemListData>', this.itemListData);
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

  closeModal() {
    console.log('close modal');
    this.custom = 'custom-model';
    this.orderid = '';
    this.driverid = '';
    this.itemid = '';
    this.onClosedAuto();
  }
  closeModal2() {
    this.custom2 = 'custom2-model';
    this.orderid = '';
    this.onClosedAuto();
  }
  // rotate() {
  //   console.log('gfgf');
  //   // this.renderer2.addClass(event.target,"custom-model show")
  //  // event.srcElement.classList.add("custom-model show");
  //   this.custom = 'custom-model show';
  // }

  selectEvent(ditem) {
    // do something with selected item
    console.log('driver item not related itemid::', ditem.id);
    this.driverid = ditem.id;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log('val::', val);
  }
  onFocused(e) {
    // do something when input is focused
    console.log('e', e);
  }

  onClosedAuto() {
    console.log('auto close201');
    this.driverid = ' ';
  }


  addorder() {
    console.log('orderitem id:', this.orderid);
    console.log('item id:', this.itemid);
    console.log(' driver id', this.driverid);

    // tslint:disable-next-line:variable-name
    const form_data = new FormData();
    console.log('<<adddata>>>',);
    form_data.append('order_id', this.orderid);
    //form_data.append('item_id', this.itemid);
    form_data.append('driver_id', this.driverid);
    this.spinnerService.show();
    this.adminservice.HttpPostReq(`admin/assigntodriver?token=${this.logtoken}`, form_data, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.toastr.success(response.message);
          this.closeModal();
          // this.router.navigateByUrl('/main/orderlist');
          this.transactionlist();
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

  removeDriver(redriver: any) {
    this.removedriver = redriver;
    this.spinnerService.show();
    this.adminservice.HttpDelReq(`admin/removedriver/?id=${this.removedriver}&token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.toastr.success(response.message);
         // this.closeModal();
          // this.router.navigateByUrl('/main/orderlist');
          this.transactionlist();
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

