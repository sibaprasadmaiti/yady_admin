import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editemailtemplate',
  templateUrl: './editemailtemplate.component.html',
  styleUrls: ['./editemailtemplate.component.scss']
})
export class EditemailtemplateComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public edit_id: any;
  updateForm: FormGroup;
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
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {this.updateForm = formbuilder.group({
      template_title: ['', Validators.compose([Validators.required])],
      template_slug: ['', Validators.compose([Validators.required])],
      email_subject: ['', Validators.compose([Validators.required])],
      template_description: ['', Validators.compose([Validators.required])]
      // status: ['']
    });
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit_id = params.e_id;
    });

    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/emailtemplateedit/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
     this.spinnerService.hide();
     this.updateForm.setValue({
      template_title: response.data[0].template_title,
      template_slug: response.data[0].template_slug,
      email_subject: response.data[0].email_subject,
      template_description: response.data[0].template_description,
      // description: response.data[0].description,
      // status: response.data[0].status.toString(),
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

  updatefaqcategoryData() {
    this.spinnerService.show();
    const updatecontent = this.updateForm.value;
    updatecontent.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/updateemailtemplate?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/emailmanagement');
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
