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
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.scss']
})
export class EditmenuComponent implements OnInit {
  // tslint:disable-next-line:variable-name
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

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {
                this.EditForm = formbuilder.group({
                  menu_name: ['', Validators.compose([Validators.required])],
				  menu_name_dutch: ['', Validators.compose([Validators.required])],
                  menu_description: ['', Validators.compose([Validators.required])],
				  menu_description_dutch: ['', Validators.compose([Validators.required])],
                  price: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)])],
                  //language: [''],
                  status: [''],
                  menu_img: ['']
                });

                this.imgpath = environment.api_url + 'public/menuimg/';

}



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit_id = params.id;
    });
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/menulistedit/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
      console.log('<<<<>>>>>>>>', response);
      console.log('<<>img>', response.data[0].menu_img);
      this.spinnerService.hide();
      this.EditForm.setValue({
        menu_name: response.data[0].menu_name,
		menu_name_dutch: response.data[0].menu_name_dutch,
        menu_description: response.data[0].menu_description,
        menu_description_dutch: response.data[0].menu_description_dutch,
        price: response.data[0].price,
        menu_img: response.data[0].menu_img,
       status: response.data[0].status.toString(),
       //language: response.data[0].language.toString(),
       });
      this.imgsrc =  response.data[0].menu_img;

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
    updatecontent.id = this.edit_id;

    // tslint:disable-next-line:variable-name
    const  form_data = new FormData();
    console.log('<<addcontent>>>', );
    form_data.append('menu_name', updatecontent.menu_name);
	form_data.append('menu_name_dutch', updatecontent.menu_name_dutch);
    form_data.append('menu_description', updatecontent.menu_description);
	form_data.append('menu_description_dutch', updatecontent.menu_description_dutch);
    form_data.append('price', updatecontent.price);
    //form_data.append('language', updatecontent.language);
    form_data.append('status', updatecontent.status);
    form_data.append('id', updatecontent.id);
    if (this.file) { 
      form_data.append('menu_img', this.file);
     // this.imgsrc = this.file;
    }

    this.adminservice.HttpPostReq(`admin/updateMenu?token=${this.logtoken}`, form_data, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/menulist');
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

}
