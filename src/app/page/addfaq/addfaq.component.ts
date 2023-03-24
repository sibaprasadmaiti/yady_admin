import { Component, OnInit , ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-addfaq',
  templateUrl: './addfaq.component.html',
  styleUrls: ['./addfaq.component.scss']
})
export class AddfaqComponent implements OnInit {
  addForm: FormGroup;
  category: any;
  logtoken = localStorage.getItem('LoginToken');
  addcontent: any;
  addfaqcategory: any;
  language = 'D';

  config: AngularEditorConfig = {
    // editable: true,
    // spellcheck: true,
    // height: '25rem',
    // minHeight: '5rem',
    // placeholder: 'Enter text here...',
    // translate: 'no',
    // uploadUrl: 'v1/images'

    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
    ],
    // customClasses: [
    //   {
    //     name: 'quote',
    //     class: 'quote',
    //   },
    //   {
    //     name: 'redText',
    //     class: 'redText'
    //   },
    //   {
    //     name: 'titleText',
    //     class: 'titleText',
    //     tag: 'h1',
    //   },
    // ]
  };
  constructor(
    public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder, ) {
      this.addForm = formbuilder.group({
        title: ['', Validators.compose([Validators.required])],
        content: ['', Validators.compose([Validators.required])],
        language: ['']
        //status: ['']
      });
     }

  ngOnInit() {
    this.faqCategory();
  }
  addData() {
    this.spinnerService.show();
    // let updatejob = this.updatejobForm.value;
    const addcontent = this.addForm.value;
   // updatejob.id = this.edit_job;
    console.log('addcontent:', addcontent);
    // this.adminservice.HttpGetReq(`admin/homecategorylist?token=${this.logtoken}`, true)
    this.adminservice.HttpPostReq(`admin/addfaq?token=${this.logtoken}`, addcontent, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       this.router.navigateByUrl('/main/faq');
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

faqCategory() {
  this.adminservice.HttpGetReq(`admin/getfaqcategory?token=${this.logtoken}`, true)
  .then(
    (response: any) => {
     // this.spinnerService.hide();
     // this.toastr.success(response.message);
     // this.router.navigateByUrl('/main/faq');
     this.addfaqcategory = response.data;
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
