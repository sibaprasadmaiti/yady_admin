import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.scss']
})
export class AddmenuComponent implements OnInit {
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
        menu_name: ['', Validators.compose([Validators.required])],
		menu_name_dutch: ['', Validators.compose([Validators.required])],
        menu_description: ['', Validators.compose([Validators.required])],
		menu_description_dutch: ['', Validators.compose([Validators.required])],
        price: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)])],
        //language: ['']
       // menu_img: ['', Validators.compose([Validators.required])],
        /*content: ['', Validators.compose([Validators.required])],
        language: ['']*/
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
    form_data.append('menu_name', addcontent.menu_name);
    form_data.append('menu_name_dutch', addcontent.menu_name_dutch);
    form_data.append('menu_description', addcontent.menu_description);
    form_data.append('menu_description_dutch', addcontent.menu_description_dutch);
    form_data.append('price', addcontent.price);
    //form_data.append('language', addcontent.language);
   // console.log('formdata:', form_data);
    if (this.file) { form_data.append('menu_img', this.file); }
 /*form_data.append('', '');
    for (var  key in addcontent) {
    console.log('key', key);
    console.log('val', addcontent[key]);
    form_data.append(key, addcontent[key]);
       }
       console.log('formdata:', form_data);*/

    this.adminservice.HttpPostReq(`admin/add-menu?token=${this.logtoken}`, form_data, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       this.router.navigateByUrl('/main/menulist');
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
