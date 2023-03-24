import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';

@Component({
  selector: 'app-service-requester-management',
  templateUrl: './service-requester-management.component.html',
  styleUrls: ['./service-requester-management.component.scss']
})
export class ServiceRequesterManagementComponent implements OnInit {

  imageSrc = '';
  showColor = false;
  showInfo = false;
  caption = 'Active';
  public serviceRequesterList: any;
  public serviceRequesterInfo: any;
  updateService: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  id: any;
  serviceRequesterid: any;
  page = 1;
  changeStatusVal: any;
  imgSrc: any;
  search_key: any;
  imageButtons = [{ src: 'tickg.png', name: 'tickg' },
  { src: 'cross.png', name: 'cross' }];
  search_type = "";
  country_id = "";
  state_id = "";
  city_id = "";
  countryData: any[] = [];
  stateData: any[] = [];
  cityData: any[] = [];
  adminType: any = 0;


  constructor(public adminservice: ApiServiceService,
    private router: Router,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          if(response.success){
            this.adminType = response.data.admin_type;
            if (response.data.admin_type == 3) {
              this.city_id = response.data.city_id;
            }
            if (response.data.admin_type == 2) {
              this.state_id = response.data.state_id;
            }
            if (response.data.admin_type == 1) {
              this.country_id = response.data.country_id;
            }
            this.serviceRequesterDetails(this.search_type, this.search_key, this.country_id, this.state_id, this.city_id);
          }else{
            this.toastr.error(response.message);
          }
        },
        (error) => {
          console.log("Error => ", error);
        }
      );

    this.getCountryList();
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

  serviceRequesterDetails(search_type: any, search_key: any, country_id: any, state_id: any, city_id: any) {
    this.spinnerService.show();
    if (search_key) {
      var searchKey = search_key;
    } else {
      var searchKey = undefined;
    }
    console.log("search type => ", search_type);
    console.log("search key => ", searchKey);
    console.log("admin type => ", this.adminType);
    console.log("city id => ", city_id);
    console.log("state id => ", state_id);
    console.log("country id => ", country_id);
    this.adminservice.HttpGetReq(`admin/serviceRequesterList?token=${this.logtoken}&stype=${search_type}&skey=${searchKey}&cId=${country_id}&sId=${state_id}&cityId=${city_id}&admin_type=${this.adminType}`, true)
      .then(
        (response: any) => {
          if(response.success){
            this.serviceRequesterList = response.data;
            this.spinnerService.hide();
            this.toastr.success(response.message);
          }else{
            //this.serviceRequesterList = [];
            this.spinnerService.hide();
            this.toastr.success(response.message);
          }
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

  getCountryList() {
    this.adminservice.HttpGetReq(`admin/getCountryList?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.countryData = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChangeCountry(countryId: number) {
    // console.log('x',countryId);
    this.stateData = [];
    if (countryId) {
      this.spinnerService.show();
      this.adminservice.HttpGetReq(`admin/getStateList?token=${this.logtoken}&country_id=${countryId}`, true)
        .then(
          (response: any) => {
            this.stateData = response.data;
            //console.log(this.stateData);
            this.spinnerService.hide();
          },
          (error) => {
            this.spinnerService.hide();
          }
        );
    }
  }
  onChangeState(stateId: number) {
    //console.log('x',stateId);
    this.cityData = [];
    if (stateId) {
      this.spinnerService.show();
      this.adminservice.HttpGetReq(`admin/getCityList?token=${this.logtoken}&state_id=${stateId}`, true)
        .then(
          (response: any) => {
            this.cityData = response.data;
            //console.log(this.stateData);
            this.spinnerService.hide();
          },
          (error) => {
            this.spinnerService.hide();
          }
        );
    }
  }

  public changeStatus(index: any, id: any, status: any) {
    this.spinnerService.show();
    const formdata = new FormData();
    formdata.append('user_id', id);
    formdata.append('status', status);
    if (status == 1) { this.changeStatusVal = 0; } else { this.changeStatusVal = 1; }
    this.adminservice.HttpPostReq(`admin/changeUserStatus?token=${this.logtoken}`, formdata, true)
      .then(
        (response: any) => {
          this.serviceRequesterList[index].status = this.changeStatusVal;
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

  searchUser(search_type: any, search_key: any, country_id: any, state_id: any, city_id: any) {
    console.log(search_key);
    this.serviceRequesterDetails(search_type, search_key, country_id, state_id, city_id);
  }

  reset_page() {
    var search_type = 'undefined';
    var search_key = 'undefined';
    var country_id = 'undefined';
    var state_id = 'undefined';
    var city_id = 'undefined';
    this.search_key = null;
    this.search_type = "";
    this.city_id = "";
    this.state_id ="";
    this.country_id = "";
    this.stateData = [];
    this.cityData = [];
    this.serviceRequesterDetails(search_type, search_key, country_id, state_id, city_id);
  }

  getwallet(sr_id: any) {
	  this.router.navigateByUrl('/main/user-wallet/'+sr_id+'/'+'1');
  }

}
