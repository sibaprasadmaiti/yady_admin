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
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['./editrecipe.component.scss']
})
export class EditrecipeComponent implements OnInit {
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
  constructor(
    private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    public toastr: ToastrService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar) { 
      this.EditForm = formbuilder.group({
      name: ['', Validators.compose([Validators.required])],
	  name_dutch: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
	  description_dutch: ['', Validators.compose([Validators.required])],
      //language: [''],
      status: [''],
      image: ['']
    });
      this.imgpath = environment.api_url + 'public/recipe/';
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.edit_id = params.id;
    });
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/recipelistedit/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
      console.log('<<<<>>>>>>>>', response);
      console.log('<<>img>', response.data[0].image);
      this.spinnerService.hide();
      this.EditForm.setValue({
        name: response.data[0].name,
		name_dutch: response.data[0].name_dutch,
        description: response.data[0].description,
        description_dutch: response.data[0].description_dutch,
        image: response.data[0].image,
        status: response.data[0].status.toString(),
       //language: response.data[0].language.toString(),
       });
      this.imgsrc =  response.data[0].image;

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
    form_data.append('name', updatecontent.name);
	form_data.append('name_dutch', updatecontent.name_dutch);
    form_data.append('description', updatecontent.description);  
    form_data.append('description_dutch', updatecontent.description_dutch);
    //form_data.append('language', updatecontent.language);
    form_data.append('status', updatecontent.status);
    form_data.append('id', updatecontent.id);
    if (this.file) { 
      form_data.append('image', this.file);
     // this.imgsrc = this.file;
    }

    this.adminservice.HttpPostReq(`admin/updateRecipe?token=${this.logtoken}`, form_data, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/recipelist');
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
