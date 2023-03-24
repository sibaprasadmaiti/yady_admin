import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
	
	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	public sub_cat_id: any;
	sub_category_id;
	question_added_from;
	price;
	cat_subcat_id;
	price_type;
	//myDefaultValue: number = 0;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) {
		
		this.addForm = formbuilder.group({
			question: ['', Validators.compose([Validators.required])],
			cat_subcat_id: [''],
			question_added_from: [''],
			question_type: [''],
			optionRows: this.formbuilder.array([this.initOptionRows()])
		});
		
		//this.price = 0;

	}

  ngOnInit() {
	this.route.params.subscribe(params => {
		this.sub_cat_id = params.sub_cat_id;
		this.question_added_from = params.type;
	});
	this.addForm.patchValue({
		cat_subcat_id: this.sub_cat_id,
		question_added_from: this.question_added_from
	});
	
	if(this.question_added_from == 'subcategory') {
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
  
  get formArr() {
    return this.addForm.get('optionRows') as FormArray;
  }
  
  initOptionRows() {
    return this.formbuilder.group({
		option:['',Validators.required],
		price:[''],
    });
  }
  addNewRow() {
	this.formArr.push(this.initOptionRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  
  addData() {
	this.spinnerService.show();
    const addcontent = this.addForm.value;
	//console.log(addcontent); return false;

    this.adminservice.HttpPostReq(`admin/addQuestions?token=${this.logtoken}`, addcontent, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       this.router.navigateByUrl('/main/question-list/'+this.sub_cat_id+'/'+this.question_added_from);
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

}
