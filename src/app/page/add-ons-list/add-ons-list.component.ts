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
  selector: 'app-add-ons-list',
  templateUrl: './add-ons-list.component.html',
  styleUrls: ['./add-ons-list.component.scss']
})
export class AddOnsListComponent implements OnInit {

	caption = 'Active';
	public addOnList: any;
	public addOnInfo: any;
	logtoken = localStorage.getItem('LoginToken');
	id: any;
	page = 1;
	addOnData: any[] = [];
	addOnData_2: any;
	changeStatusVal: any;
	imageButtons = [ {src: 'tickg.png', name: 'tickg'},
	{src: 'cross.png', name: 'cross'}];
	public imgpath: any;
	public defaultimg: any;
	public sub_cat_id: any;
	public add_on_type: any;
	showColor = false;
	back_param: any;
  adminType: any = 0;

  constructor(private route: ActivatedRoute,
				public adminservice: ApiServiceService,
               private router: Router,
               public formbuilder: FormBuilder,
               public toastr: ToastrService,
               private spinnerService: Ng4LoadingSpinnerService,
               public snackBar: MatSnackBar,
               public matDialog: MatDialog) { }

  ngOnInit() {
	  this.addOnListShow();
	  this.route.params.subscribe(params => {
			this.back_param = params.type;
			this.sub_cat_id = params.sub_cat_id;
		});

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
	this.route.params.subscribe(params => {
		this.sub_cat_id = params.sub_cat_id;
		this.add_on_type = params.type;
	});
    this.router.navigateByUrl('/main/add-ons/'+this.sub_cat_id+'/'+this.add_on_type);
  }
  editMenu(id: any){
    this.router.navigateByUrl(`/main/add-ons-edit/${id}`);
  }

  addOnListShow() {
	this.route.params.subscribe(params => {
		this.sub_cat_id = params.sub_cat_id;
	});
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/addAddOnsList/${this.sub_cat_id}/?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.addOnData = response.data;
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
      formdata.append('addon_id', id);
      formdata.append('status', status);
      if (status == 1) {this.changeStatusVal = 0; } else {this.changeStatusVal =  1 ; }
      this.adminservice.HttpPostReq (`admin/changeAddOnStatus?token=${this.logtoken}`, formdata , true)
        .then(
          (response: any) => {
           this.addOnData[index].status = this.changeStatusVal;
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
    backtosublist(sub_cat_id) {
		//console.log(sub_cat_id);
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/subCategoryData/${sub_cat_id}/?token=${this.logtoken}`, true)
		.then(
		(response: any) => {
			//console.log('ssssssss',response.data.categoryId);
			this.addOnData_2 = response.data.categoryId;
			this.spinnerService.hide();
			this.router.navigateByUrl('/main/sub-category-list/'+this.addOnData_2);
		},
		(error) => {
			this.spinnerService.hide();
		}
		);
		//console.log('abc',this.addOnData_2);
    }

}
