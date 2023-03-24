import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-ons-edit',
  templateUrl: './add-ons-edit.component.html',
  styleUrls: ['./add-ons-edit.component.scss']
})
export class AddOnsEditComponent implements OnInit {
	
	public edit_id: any;
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	status: any;
	public sub_cat_id: any;
	public cat_subcat_id: any;
	public add_on_type: any;
	price_type;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { 
			  
				this.EditForm = formbuilder.group({
					add_on_title: ['', Validators.compose([Validators.required])],
					add_on_description: ['', Validators.compose([Validators.required])],
					price: ['', Validators.compose([Validators.required])],
					per_hour_status: ['']
				});
			  
			  }

  ngOnInit() {
	  this.route.params.subscribe(params => {
		this.edit_id = params.id;
	});
	this.spinnerService.show();
	this.adminservice.HttpGetReq(`admin/addAddOnsData/${this.edit_id}/?token=${this.logtoken}`, true)
		.then((response: any) => {
		  this.spinnerService.hide();
		  this.EditForm.patchValue({
				add_on_title: response.data.add_on_title,
				add_on_description: response.data.add_on_description,
				price: response.data.price,
				per_hour_status: response.data.per_hour_status.toString(),
			});
			this.cat_subcat_id =  response.data.cat_subcat_id;
			this.add_on_type =  response.data.add_on_type;
			
			//console.log('aaa',this.add_on_type);
			if(this.add_on_type == 'subcategory') {
				this.adminservice.HttpGetReq(`admin/subCategoryData/${this.cat_subcat_id}/?token=${this.logtoken}`, true)
					.then((response: any) => {
						this.price_type =  response.data.price_status;
						//console.log('this.price_type',this.price_type);
					},
					(error) => {
				
					}
				);
			} else {
				this.adminservice.HttpGetReq(`admin/categoryData/${this.cat_subcat_id}/?token=${this.logtoken}`, true)
					.then((response: any) => {
						this.price_type =  response.data.price_status;
						//console.log('this.price_type',this.price_type);
					},
					(error) => {
				
					}
				);
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
  
  updateData() {
    this.spinnerService.show();
    const updatecontent = this.EditForm.value;
    updatecontent.add_on_id = this.edit_id;
	//console.log(updatecontent); return false;
    this.adminservice.HttpPostReq(`admin/updateAddOns?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/add-ons-list/'+this.cat_subcat_id+'/'+this.add_on_type);
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
