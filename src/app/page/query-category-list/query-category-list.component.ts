import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-query-category-list',
  templateUrl: './query-category-list.component.html',
  styleUrls: ['./query-category-list.component.scss']
})
export class QueryCategoryListComponent implements OnInit {
	imageSrc = '';
	showColor = false;
	showInfo = false;
	caption = 'Active';
	public categoryList: any;
	public categoryInfo: any;
	updateCategory: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	id: any;
	page = 1;
	changeStatusVal: any;
	imgSrc: any;
	categoryData: any;
	category_name: null;
	imageButtons = [{ src: 'tickg.png', name: 'tickg' },
	{ src: 'cross.png', name: 'cross' }];
	public imgpath: any;
	public defaultimg: any;
	city_id = "";
	state_id = "";
	country_id = "";
	adminType: any = 0;

  constructor(public adminservice: ApiServiceService,
    private router: Router,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) {
		this.imgpath = environment.api_url + 'public/category_image/';
		this.defaultimg = environment.api_url + 'public/category_image/no_image.png';
	}

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
            this.queryCategoryListShow(this.category_name, this.city_id);
          }else{
            this.toastr.error(response.message);
          }

        },
        (error) => {
          console.log("Error => ", error);
        }
      );
    }

	queryCategoryListShow(category_name: any, city_id: any) {
		this.spinnerService.show();
		if (category_name) {
		  var category_name = category_name;
		} else {
		  var category_name = undefined;
		}
		console.log("category name => ", category_name);
		console.log("city id => ", city_id);
		console.log("state id => ", this.state_id);
		console.log("country id => ", this.country_id);
		this.adminservice.HttpGetReq(`admin/queryCategoryList?token=${this.logtoken}&category_name=${category_name}&city_id=${city_id}&state_id=${this.state_id}&country_id=${this.country_id}`, true)
		  .then(
			(response: any) => {
			  this.categoryData = response.data;
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
    if(this.adminType != 3){
      this.spinnerService.show();
      const formdata = new FormData();
      formdata.append('cat_id', id);
      formdata.append('status', status);
      if (status == 1) { this.changeStatusVal = 0; } else { this.changeStatusVal = 1; }
      this.adminservice.HttpPostReq(`admin/changeQueryCategoryStatus?token=${this.logtoken}`, formdata, true)
        .then(
          (response: any) => {
            this.categoryData[index].status = this.changeStatusVal;
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

  }

	addNew() {
		console.log('hi....');
		this.router.navigateByUrl('/main/query-category-add');
	}
	editCat(id: any) {
		this.router.navigateByUrl(`/main/query-category-edit/${id}`);
	}
	viewPlaces(area_id) {
		this.router.navigateByUrl('/main/query-cat-area-places/' + area_id);
	}

}
