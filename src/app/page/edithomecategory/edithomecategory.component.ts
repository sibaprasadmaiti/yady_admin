import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edithomecategory',
  templateUrl: './edithomecategory.component.html',
  styleUrls: ['./edithomecategory.component.scss']
})
export class EdithomecategoryComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public edit_id: any;
  updateContentForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {
                this.updateContentForm = formbuilder.group({
                  categoryname: ['', Validators.compose([Validators.required])],
                  status: ['']
            });
               }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit_id = params.hc_id;
    });
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/homecategoryedit/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
     this.spinnerService.hide();
     this.updateContentForm.setValue({
      categoryname: response.data[0].categoryname,
      // description: response.data[0].description,
       status: response.data[0].status.toString(),
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

  updatehomecategoryData() {
    this.spinnerService.show();
    const updatecontent = this.updateContentForm.value;
    updatecontent.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/updatehomecategory?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/homecategory');
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
