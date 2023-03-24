import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-edit-cms',
  templateUrl: './edit-cms.component.html',
  styleUrls: ['./edit-cms.component.scss']
})
export class EditCmsComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public edit_content: any;
  updateContentForm: FormGroup;
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
    //     name: "quote",
    //     class: "quote",
    //   },
    //   {
    //     name: 'redText',
    //     class: 'redText'
    //   },
    //   {
    //     name: "titleText",
    //     class: "titleText",
    //     tag: "h1",
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
              this.updateContentForm = formbuilder.group({
                title: ['', Validators.compose([Validators.required])],
                description: ['', Validators.compose([Validators.required])],
                status: [''],
                language: ['']

  });
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit_content = params['cms_id'];
    });
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/contentedit/${this.edit_content}/?token=${this.logtoken}`,true)
    .then((response: any) => {
     this.spinnerService.hide();
     this.updateContentForm.setValue({
       title: response.data[0].title,
       description: response.data[0].description,
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
  updatejobData() {
    this.spinnerService.show();
    const updatecontent = this.updateContentForm.value;
    updatecontent.id = this.edit_content;
    this.adminservice.HttpPostReq(`admin/updatecontent?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success == true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/managecontent');
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
  )
  }

}
