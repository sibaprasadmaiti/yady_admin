import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editfaq',
  templateUrl: './editfaq.component.html',
  styleUrls: ['./editfaq.component.scss']
})
export class EditfaqComponent implements OnInit {
  public edit_id: any;
  public addfaqcategory: any;
  category: any;
  updateFaqForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
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
  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {
      this.updateFaqForm = formbuilder.group({
        title: ['', Validators.compose([Validators.required])],
        content: ['', Validators.compose([Validators.required])],
        // category: [''],
        status: [''],
        language: ['']
  });
     }

  ngOnInit() {
   // this.faqCategory();
    this.route.params.subscribe(params => {
      this.edit_id = params.f_id;
    });
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/faqedit/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
      console.log('<<<<>>>>>>>>', response);
      this.spinnerService.hide();
      this.updateFaqForm.setValue({
      title: response.data[0].title,
       content: response.data[0].content,
      //  category: response.data[0].category,
       status: response.data[0].status.toString(),
       language: response.data[0].language.toString(),
       });

    },
   (error) => {
     this.spinnerService.hide();
     this.snackBar.open('Internal server error', 'End now', {
       duration: 5000,
     });
   }
   );
  }



  updatefaqData() {
    this.spinnerService.show();
    const updatecontent = this.updateFaqForm.value;
    updatecontent.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/updatefaq?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/faq');
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
