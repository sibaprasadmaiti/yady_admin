import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-addcms',
  templateUrl: './addcms.component.html',
  styleUrls: ['./addcms.component.scss']
})
export class AddcmsComponent implements OnInit {
  addForm: FormGroup;
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
  language = 'D';
  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {
      this.addForm = formbuilder.group({
        title: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        language: ['']
        /*salary: ['', Validators.compose([Validators.required])],
        logo: [''],
        location: ['', Validators.compose([Validators.required])],
        duedate: ['', Validators.compose([Validators.required])],
        urgent_listing: [''],
        status: ['']*/
  });
    }

  ngOnInit() {
  }

  addData() {
    this.spinnerService.show();
    // let updatejob = this.updatejobForm.value;
    const addcontent = this.addForm.value;
   // updatejob.id = this.edit_job;
    console.log('addcontent:', addcontent);

    this.adminservice.HttpPostReq(`admin/addcontent?token=${this.logtoken}`, addcontent, true)
    .then(
      (response: any) => {
       // this.cmsList = response.data;
       this.spinnerService.hide();
       this.toastr.success(response.message);
       // managecontent
       this.router.navigateByUrl('/main/managecontent');
      },
     (error) => {
      this.spinnerService.hide();
      this.toastr.error('Internal server error');
      this.snackBar.open('Internal server error', 'End now', {
        duration: 5000,
      });
     }
   );

  //   this.adminservice.addCOntentDetails(addcontent)
  //    .subscribe((response) => {
  //      if (response.success === true) {
  //       this.spinnerService.hide();
  //       this.snackBar.open(response.message, 'End now', {
  //         duration: 5000,
  //       });
  //       this.router.navigateByUrl('/main/managecontent');

  //      } else {
  //       this.spinnerService.hide();
  //       this.snackBar.open(response.message, 'End now', {
  //         duration: 5000,
  //       });
  //      }

  //    },
  //   (error) => {
  //     this.spinnerService.hide();
  //     this.snackBar.open('Internal server error', 'End now', {
  //       duration: 5000,
  //     });
  //   }
  // );

}

}
