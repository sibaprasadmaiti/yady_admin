import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  public userName: any;
  public userEmail: any;
  public profileData: any;
  // public updateForm: any;
  public updateForm: FormGroup;
  public totalServiceRequester: any;
  public totalServiceProvider: any;
  public totalServiceDispatcher: any;
  public totalCategory: any;
  public totalSubCategory: any;
  public totalFaq: any;
  public latestUData: any;
  public prevedate: any;
  public reviewlist: any;
  public curencylist: any;
  public curencyArr: any;
  public getcurencyList: any;
  public  addcontent: any;
  public imgpath: any;
  public defaultimg: any;
  logtoken = localStorage.getItem('LoginToken');
  constructor(
    public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    private router: Router,
    public snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService,
    private http: HttpClient,
    // tslint:disable-next-line:variable-name
    private _location: Location
   ) {
    this.imgpath = environment.api_url + 'public/productimage/';
    this.defaultimg = environment.api_url + 'public/productimage/default-book.png';
    }

  ngOnInit() {
    this.spinnerService.show();
    this.profileData = {};
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.profileData = response.data;
          this.userName = response.data.name;
          this.userEmail = response.data.email;

          // this.updateForm.setValue({
          //   name:  this.profileData.name,
          //   username: this.profileData.username,
          //   email: this.profileData.email,
          // });

        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error', 'End now', {
            duration: 5000,
          });
        }
        );

    this.adminservice.HttpGetReq(`admin/userCount/1?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.totalServiceRequester = response.data;
		  console.log(this.totalServiceRequester);
        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error', 'End now', {
            duration: 5000,
          });
        }
        );
		
	this.adminservice.HttpGetReq(`admin/userCount/2?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.totalServiceProvider = response.data;
		  console.log(this.totalServiceProvider);
        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error', 'End now', {
            duration: 5000,
          });
        }
	);
	this.adminservice.HttpGetReq(`admin/userCount/3?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.totalServiceDispatcher = response.data;
		  console.log(this.totalServiceDispatcher);
        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error', 'End now', {
            duration: 5000,
          });
        }
	);
	this.adminservice.HttpGetReq(`admin/categoryCount?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.totalCategory = response.data;
		  console.log(this.totalCategory);
        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error', 'End now', {
            duration: 5000,
          });
        }
	);
	this.adminservice.HttpGetReq(`admin/subCategoryCount?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.totalSubCategory = response.data;
		  console.log(this.totalSubCategory);
        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error', 'End now', {
            duration: 5000,
          });
        }
	);

    /*this.adminservice.HttpGetReq(`admin/getallcontentcount?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.totalCms = response.data[0].totalcms;
        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error2', 'End now', {
            duration: 5000,
          });
        }
        );*/

    /*this.adminservice.HttpGetReq(`admin/getallhomecategorycount?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.totalHomeCategory = response.data[0].totalhomecat;
        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Internal server error2', 'End now', {
            duration: 5000,
          });
        }
        );*/

    /*this.adminservice.HttpGetReq(`admin/getallfaqcount?token=${this.logtoken}`, true)
        .then(
          (response: any) => {
            this.spinnerService.hide();
            this.totalFaq = response.data[0].totalfaq;
          },
          (error) => {
            this.spinnerService.hide();
            this.snackBar.open('Internal server error2', 'End now', {
              duration: 5000,
            });
          }
          );*/

    /*this.adminservice.HttpGetReq(`admin/getlastUser?token=${this.logtoken}`, true)
        .then(
          (response: any) => {
            this.spinnerService.hide();
            this.latestUData = response.data;
          },
          (error) => {
            this.spinnerService.hide();
            this.snackBar.open('Internal server error2', 'End now', {
              duration: 5000,
            });
          }
          );*/

          // myDate = new Date();
          // constructor(private datePipe: DatePipe){
          //     this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
          // }



    /*this.adminservice.HttpGetReq(`admin/getRatingReviewList?token=${this.logtoken}`, true)
        .then(
          (response: any) => {
            this.spinnerService.hide();
            this.reviewlist = response.data;
          },
          (error) => {
            this.spinnerService.hide();
            this.snackBar.open('Internal server error2', 'End now', {
              duration: 5000,
            });
          }
          );*/


    /*this.adminservice.HttpGetReq(`admin/getCurrencyList?token=${this.logtoken}`, true)
        .then(
          (response: any) => {
            this.spinnerService.hide();
            this.getcurencyList = response.data;
          },
          (error) => {
            this.spinnerService.hide();
            this.snackBar.open('Internal server error for currency list', 'End now', {
              duration: 5000,
            });
          }
          );*/


  }

  /*myUser() {
    console.log('hi....');
    this.router.navigateByUrl('/main/user-management');
  }

  myFaq() {
    console.log('hi....');
    this.router.navigateByUrl('/main/faq');
  }

  myContent() {
    console.log('hi....');
    this.router.navigateByUrl('/main/managecontent');
  }

  myHomeCategory() {
    console.log('hi....');
    this.router.navigateByUrl('/main/homecategory');
  }
  backClicked() {
    this._location.back();
  }*/

}
