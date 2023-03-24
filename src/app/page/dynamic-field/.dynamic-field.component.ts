import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss']
})
export class DynamicFieldComponent implements OnInit {
	
	addForm: FormGroup;
	logtoken = localStorage.getItem('LoginToken');
	addcontent: any;
	original_pic = '';
	file: any;
	public cat_id: any;
	category_id;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) { 
	
		this.addForm = formbuilder.group({
			sub_category_name: ['', Validators.compose([Validators.required])],
			category_id: [''],
			//hobbies: new FormArray([]),
			itemRows: this.formbuilder.array([this.initItemRows()])
		});
	}
	
	/*get hobbyControls() {
		return (<FormArray>this.addForm.get('hobbies')).controls;
	}*/
	
	get formArr() {
    return this.addForm.get('itemRows') as FormArray;
  }

  ngOnInit() {
	this.route.params.subscribe(params => {
		this.cat_id = params.cat_id;
	});
	this.addForm.patchValue({
		category_id: this.cat_id
	});
	
	/*this.addForm = this.formbuilder.group({
  	  sub_category_name:['',[Validators.required]],
  	  category_id:['',],
      itemRows: this.formbuilder.array([this.initItemRows()])
    });*/
	
  }
  
  initItemRows() {
    return this.formbuilder.group({
		timeRange:[''],
		learn:[''],
    });
  }
  addNewRow() {
	this.formArr.push(this.initItemRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  
  addData() {
	  const addcontent = this.addForm.value;
	  console.log(addcontent);
	  /*this.spinnerService.show();
    const addcontent = this.addForm.value;
	//console.log('<<file>>>', this.file); return false;
    const  form_data = new FormData();
    form_data.append('sub_category_name', addcontent.sub_category_name);
    form_data.append('category_id', addcontent.category_id);
    if (this.file) { form_data.append('sub_category_image', this.file); }

    this.adminservice.HttpPostReq(`admin/addSubCategory?token=${this.logtoken}`, form_data, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       this.router.navigateByUrl('/main/sub-category-list/'+this.cat_id);
      },
     (error) => {
      this.spinnerService.hide();
      this.toastr.error('Internal server error');
      this.snackBar.open('Internal server error', 'End now', {
        duration: 5000,
      });
     }
   );*/
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
    // const reader = new FileReader();
    /*reader.onload = e => {
      // console.log(e.target.result)
      this.original_pic = e.target.result.toString(); // reader.result.toString()
    };*/

   // reader.readAsDataURL(this.file);
  }
  
  onAddHobby() {
	  const control = new FormControl(null, [Validators.required]);
	  (<FormArray>this.addForm.get('hobbies')).push(control);
  }

}
