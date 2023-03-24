import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss']
})
export class AddrecipeComponent implements OnInit {
  addForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  addcontent: any;
  // tslint:disable-next-line:variable-name
  original_pic = '';
  file: any;
  language = 'D';
  constructor(
    public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder) { 
      this.addForm = formbuilder.group({
        name: ['', Validators.compose([Validators.required])],
		name_dutch: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],  
		description_dutch: ['', Validators.compose([Validators.required])]	
        //language: ['']
        // content: ['', Validators.compose([Validators.required])],
        // status: ['']
       // menu_img: ['']
      });
    }

  ngOnInit() {
  }

  addData() {
    const addcontent = this.addForm.value;
    // console.log('<<file>>>', this.file);
    // tslint:disable-next-line:variable-name
    const  form_data = new FormData();
    console.log('<<addcontent>>>', );
    form_data.append('name', addcontent.name);
	form_data.append('name_dutch', addcontent.name_dutch);
    form_data.append('description', addcontent.description);
    form_data.append('description_dutch', addcontent.description_dutch);
    //form_data.append('language', addcontent.language);
   // console.log('formdata:', form_data);
    if (this.file) { form_data.append('image', this.file); }
 /*form_data.append('', '');
    for (var  key in addcontent) {
    console.log('key', key);
    console.log('val', addcontent[key]);
    form_data.append(key, addcontent[key]);
       }
       console.log('formdata:', form_data);*/

    this.adminservice.HttpPostReq(`admin/add-recipe?token=${this.logtoken}`, form_data, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       this.router.navigateByUrl('/main/recipelist');
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

}
