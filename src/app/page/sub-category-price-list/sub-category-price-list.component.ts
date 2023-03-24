import { Component, OnInit, ChangeDetectionStrategy, Input, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sub-category-price-list',
  templateUrl: './sub-category-price-list.component.html',
  styleUrls: ['./sub-category-price-list.component.scss']
})
export class SubCategoryPriceListComponent implements OnInit {

	caption = 'Active';
	public addOnList: any;
	public addOnInfo: any;
	logtoken = localStorage.getItem('LoginToken');
	id: any;
	page = 1;
	priceData: any;
	allPriceData: any;
	changeStatusVal: any;
	imageButtons = [ {src: 'tickg.png', name: 'tickg'},
	{src: 'cross.png', name: 'cross'}];
	public imgpath: any;
	public defaultimg: any;
	public sub_cat_id: any;
	addForm: FormGroup;
	price;
	showColor = false;
	EditForm: FormGroup;
  adminType: any = 0;

  constructor(private route: ActivatedRoute,
				public adminservice: ApiServiceService,
               private router: Router,
               public formbuilder: FormBuilder,
               public toastr: ToastrService,
               private spinnerService: Ng4LoadingSpinnerService,
               public snackBar: MatSnackBar,
               public matDialog: MatDialog) {

					this.addForm = formbuilder.group({
						optionRows: this.formbuilder.array([this.initOptionRows()])
					});
					this.EditForm = formbuilder.group({
					price_structure_question: ['', Validators.compose([Validators.required])],
				});

			   }

  ngOnInit() {
	  this.priceListShow();

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
  get formArr() {
    return this.addForm.get('optionRows') as FormArray;
  }
  initOptionRows() {
    return this.formbuilder.group({
		hour:['',Validators.required],
		price:[''],
    });
  }
  addNewRow() {
	this.formArr.push(this.initOptionRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  priceListShow() {
	this.route.params.subscribe(params => {
		this.sub_cat_id = params.sub_cat_id;
	});
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/viewSubCategoryPrice/${this.sub_cat_id}/?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
		  //console.log(response.data.price_structure);
		  this.EditForm.patchValue({
				price_structure_question: response.data.price_structure_question,
			});
       this.priceData = response.data.price_structure;
	   this.allPriceData = response.data;
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

  deleteOption(label,index = -1) {
	  this.route.params.subscribe(params => {
		this.sub_cat_id = params.sub_cat_id;
	});
	this.spinnerService.show();
	const formdata = new FormData();
	formdata.append('sub_cat_id', this.sub_cat_id);
	formdata.append('hour', label);

	this.adminservice.HttpPostReq (`admin/deleteSubCategoryPrice?token=${this.logtoken}`, formdata, true )
      .then(
        (response: any) => {
        //this.answerData.splice(index, 1);
         this.spinnerService.hide();
         this.toastr.success(response.message);
		 this.priceListShow();
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

  addData() {
	this.spinnerService.show();
	const addcontent = this.addForm.value;
	addcontent.sub_cat_id = this.sub_cat_id;

	this.adminservice.HttpPostReq(`admin/addSubCategoryPrices?token=${this.logtoken}`, addcontent, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
	   this.priceListShow();
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

  backtolist() {
	  console.log('hi....');
      this.router.navigateByUrl('/main/sub-category-list/'+this.allPriceData.category_id);
  }

	updateData() {
		this.spinnerService.show();
		const updatecontent = this.EditForm.value;
		updatecontent.sub_cat_id = this.sub_cat_id;
		this.adminservice.HttpPostReq(`admin/updateSubcategoryPriceStructureQuestion?token=${this.logtoken}`, updatecontent, true)
		.then((response: any) => {
			if (response.success === true) {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
			} else {
				this.spinnerService.hide();
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
			}
		},
		(error) => {
			this.spinnerService.hide();
			this.snackBar.open('Internal server error', 'End now', {
				duration: 5000,
			});
		}
		);
	}

}
