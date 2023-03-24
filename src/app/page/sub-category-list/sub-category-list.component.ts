import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

	imageSrc = '';
	showColor = false;
	showInfo = false;
	caption = 'Active';
	public subCategoryList: any;
	public subCategoryInfo: any;
	updateSubCategory: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	id: any;
	page = 1;
	changeStatusVal: any;
	imgSrc: any;
	subCategoryData: any;
	imageButtons = [ {src: 'tickg.png', name: 'tickg'},
	{src: 'cross.png', name: 'cross'}];
	public imgpath: any;
	public defaultimg: any;
	public cat_id: any;
	sub_category_name: null;
  adminType: any = 0;

  constructor(private route: ActivatedRoute,
				public adminservice: ApiServiceService,
               private router: Router,
               public formbuilder: FormBuilder,
               public toastr: ToastrService,
               private spinnerService: Ng4LoadingSpinnerService,
               public snackBar: MatSnackBar,
               public matDialog: MatDialog) {
				this.imgpath = environment.api_url+'public/category_image/';
				this.defaultimg = environment.api_url+'public/category_image/no_image.png';
			  }

  ngOnInit() {
	  this.subCategoryListShow(this.sub_category_name);
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          if(response.success){
            this.adminType = response.data.admin_type;
          }else{
            this.toastr.error(response.message);
          }

        },
        (error) => {
          console.log("Error => ", error);
        }
      );
  }
  addNew() {
    console.log('hi....');
	this.route.params.subscribe(params => {
		this.cat_id = params.cat_id;
	});
    this.router.navigateByUrl('/main/sub-category-add/'+this.cat_id);
  }
  editMenu(id: any){
    this.router.navigateByUrl(`/main/sub-category-edit/${id}`);
  }
  openAddOns(id: any) {
	  this.router.navigateByUrl(`/main/add-ons-list/${id}/subcategory`);
  }
  openQuestion(id: any) {
	  this.router.navigateByUrl(`/main/question-list/${id}/subcategory`);
  }
  subCategoryListShow(sub_category_name: any) {
	if(sub_category_name) {
		var sub_category_name = sub_category_name;
	} else {
		var sub_category_name = undefined;
	}
	this.route.params.subscribe(params => {
		this.cat_id = params.cat_id;
	});
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/subCategoryList/${this.cat_id}/?token=${this.logtoken}&sub_category_name=${sub_category_name}`, true)
    .then(
      (response: any) => {
       this.subCategoryData = response.data;
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
    if(this.adminType !=3){
      this.spinnerService.show();
      const formdata = new FormData();
      formdata.append('sub_cat_id', id);
      formdata.append('status', status);
      if (status == 1) {this.changeStatusVal = 0; } else {this.changeStatusVal =  1 ; }
      this.adminservice.HttpPostReq (`admin/changeSubCategoryStatus?token=${this.logtoken}`, formdata , true)
        .then(
          (response: any) => {
           this.subCategoryData[index].status = this.changeStatusVal;
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

  backtolist() {
	  console.log('hi....');
      this.router.navigateByUrl('/main/category-list');
  }

	openSubPrice(id) {
		console.log(id);
		this.router.navigateByUrl('/main/sub-category-price-list/'+id);
	}

	searchSubCategory(sub_category_name: any) {
	  console.log(sub_category_name);
	  this.subCategoryListShow(sub_category_name);
  }

  reset_page() {
	  var sub_category_name = undefined;
	  this.sub_category_name = null;
	  this.subCategoryListShow(sub_category_name);
  }
	editArea(cat_id,subcat_id) {
		this.router.navigateByUrl('/main/cat-subcat-area/'+cat_id+'/'+subcat_id);
	}
	viewPlaces(area_id) {
		this.router.navigateByUrl('/main/cat-subcat-area-places/'+area_id);
	}

}
