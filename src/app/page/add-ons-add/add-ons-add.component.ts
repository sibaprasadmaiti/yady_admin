import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-add-ons-add',
  templateUrl: './add-ons-add.component.html',
  styleUrls: ['./add-ons-add.component.scss']
})
export class AddOnsAddComponent implements OnInit {
	
	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	public sub_cat_id: any;
	public add_on_type: any;
	sub_category_id;
	price_type;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) { 
	
		this.addForm = formbuilder.group({
			add_on_title: ['', Validators.compose([Validators.required])],
			cat_subcat_id: [''],
			add_on_description: ['', Validators.compose([Validators.required])],
			price: ['', Validators.compose([Validators.required])],
			per_hour_status: [''],
			add_on_type: ['']
		});
	
	}

  ngOnInit() {
	  this.route.params.subscribe(params => {
		this.sub_cat_id = params.sub_cat_id;
		this.add_on_type = params.type;
	});
	this.addForm.patchValue({
		cat_subcat_id: this.sub_cat_id,
		add_on_type : this.add_on_type
	});
	if(this.add_on_type == 'subcategory') {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/subCategoryData/${this.sub_cat_id}/?token=${this.logtoken}`, true)
			.then((response: any) => {
				this.spinnerService.hide();  
				this.price_type =  response.data.price_status;
				console.log('this.price_type',this.price_type);
			},
		   (error) => {
			 this.spinnerService.hide();
			 this.snackBar.open('Internal server error', 'End now', {
			   duration: 5000,
			 });
		   }
		);
	} else {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/categoryData/${this.sub_cat_id}/?token=${this.logtoken}`, true)
			.then((response: any) => {
				this.spinnerService.hide();  
				this.price_type =  response.data.price_status;
				console.log('this.price_typeddddddd',this.price_type);
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
  
  addData() {
	this.spinnerService.show();
    const addcontent = this.addForm.value;
	//console.log(addcontent); return false;

    this.adminservice.HttpPostReq(`admin/addAddOns?token=${this.logtoken}`, addcontent, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       this.router.navigateByUrl('/main/add-ons-list/'+this.sub_cat_id+'/'+this.add_on_type);
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
		this.router.navigateByUrl('/main/add-ons-list/'+this.sub_cat_id+'/'+this.add_on_type);
	}

}
