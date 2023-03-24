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
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {
	
	public edit_id: any;
	EditForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	status: any;
	public sub_cat_id: any;
	public question_added_from: any;
	question_type: any;
	price_type;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {

					this.EditForm = formbuilder.group({
						question: ['', Validators.compose([Validators.required])],
						question_type: ['']
					});

				  }

  ngOnInit() {
	  this.route.params.subscribe(params => {
		this.edit_id = params.id;
	});
	this.spinnerService.show();
	this.adminservice.HttpGetReq(`admin/questionsData/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
      this.spinnerService.hide();
      this.EditForm.setValue({
			question: response.data.question,
			question_type: response.data.question_type,
        });
		this.sub_cat_id =  response.data.cat_subcat_id;
		this.question_added_from =  response.data.question_added_from;
		
		if(this.question_added_from == 'subcategory') {
			this.adminservice.HttpGetReq(`admin/subCategoryData/${this.sub_cat_id}/?token=${this.logtoken}`, true)
				.then((response: any) => {
					this.price_type =  response.data.price_status;
					//console.log('this.price_type',this.price_type);
				},
				(error) => {
			
				}
			);
		} else {
			this.adminservice.HttpGetReq(`admin/categoryData/${this.sub_cat_id}/?token=${this.logtoken}`, true)
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
    updatecontent.question_id = this.edit_id;
	//console.log(updatecontent); return false;
    this.adminservice.HttpPostReq(`admin/updateQuestion?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/question-list/'+this.sub_cat_id+'/'+this.question_added_from);
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
