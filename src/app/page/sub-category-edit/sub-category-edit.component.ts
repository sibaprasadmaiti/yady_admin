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
  selector: 'app-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.scss']
})
export class SubCategoryEditComponent implements OnInit {

	public edit_id: any;
	public addfaqcategory: any;
	category: any;
	EditForm: FormGroup;
	imgsrc: any;
	logtoken = localStorage.getItem('LoginToken');
	public imgpath: any;
	file: any;
	language: any;
	status: any;
	aq_status: any;
	public cat_id: any;
	timezoneData: any[] = [];
	price_status;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {
				this.EditForm = formbuilder.group({
						sub_category_name: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
						status: ['', Validators.compose([Validators.required])],
						sub_category_image: [''],
						material_cost: ['', Validators.compose([Validators.required])],
						inspection_cost: ['', Validators.compose([Validators.required])],
						fixed_price_hour: [''],
						start_time: [''],
						end_time: [''],
						timezone_id: [''],
						time_interval: [''],
						aq_status: ['', Validators.compose([Validators.required])],
					});

				this.imgpath = environment.api_url + 'public/category_image/';
			  }

  ngOnInit() {
	this.getTimezoneList();
	this.route.params.subscribe(params => {
		this.edit_id = params.id;
	});
	this.spinnerService.show();
	this.adminservice.HttpGetReq(`admin/subCategoryData/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
      this.spinnerService.hide();
      this.EditForm.patchValue({
			sub_category_name: response.data.sub_category_name,
      description: response.data.description,
			sub_category_image: response.data.sub_category_image,
			status: response.data.status,
			material_cost: response.data.material_cost,
			inspection_cost: response.data.inspection_cost,
			fixed_price_hour: response.data.fixed_price_hour,
			aq_status: response.data.aq_status,
			start_time: response.data.start_time_24,
			end_time: response.data.end_time_24,
			timezone_id: response.data.timezone_id,
			time_interval: response.data.time_interval,
        });
		this.aq_status =  response.data.aq_status;
        this.imgsrc =  response.data.sub_category_image;
		this.cat_id =  response.data.categoryId;
		this.price_status = response.data.price_status;
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
    const updatecontent = this.EditForm.value;
	//console.log(updatecontent); return false;
	if(updatecontent.start_time == '') {
		alert('Please enter start time');
		return false;
	}
	if(updatecontent.end_time == '') {
		alert('Please enter end time');
		return false;
	}
	if((updatecontent.start_time) > (updatecontent.end_time))
	{
		alert('Start time should be less than end time');
		return false;
	}
    updatecontent.id = this.edit_id;
    const form_data = new FormData();
    form_data.append('sub_category_name', updatecontent.sub_category_name);
    form_data.append('description', updatecontent.description);
    form_data.append('status', updatecontent.status);
    form_data.append('sub_cat_id', updatecontent.id);
    form_data.append('material_cost', updatecontent.material_cost);
    form_data.append('inspection_cost', updatecontent.inspection_cost);
    form_data.append('fixed_price_hour', updatecontent.fixed_price_hour);
	form_data.append('start_time', updatecontent.start_time);
    form_data.append('end_time', updatecontent.end_time);
    form_data.append('timezone_id', updatecontent.timezone_id);
	form_data.append('time_interval', updatecontent.time_interval ? updatecontent.time_interval : "60");
    if (this.file) {
      form_data.append('sub_category_image', this.file);
    }
	//console.log(form_data); return false;
	this.spinnerService.show();
    this.adminservice.HttpPostReq(`admin/updateSubCategory?token=${this.logtoken}`, form_data, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/sub-category-list/'+this.cat_id);
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

   onFileChoose(event) {
    if (!event.target.files.length) { return; }
    // tslint:disable-next-line:prefer-const
    let file = event.target.files[0];
    // let kb = Math.round((file.size / 1024));
    /*if (kb > (3 * 1024)){
      this.toast.showError("File size too big, please select under 3MB");
      return;
    }*/

    this.file = file;
    // console.log('this.file', this.file);
    /* const reader = new FileReader();
    reader.onload = e => {
      // console.log(e.target.result)
      this.original_pic = e.target.result.toString(); // reader.result.toString()
    };*/

   // reader.readAsDataURL(this.file);
  }

	getTimezoneList() {
		this.adminservice.HttpGetReq(`admin/getTimezoneList?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.timezoneData = response.data;
				//console.log(this.countryData);
			},
			(error) => {

			}
		);
	}

}
