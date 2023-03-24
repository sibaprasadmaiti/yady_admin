import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editplansubscription',
  templateUrl: './editplansubscription.component.html',
  styleUrls: ['./editplansubscription.component.scss']
})
export class EditplansubscriptionComponent implements OnInit {

  public edit_id: any;
  updatePlanForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {this.updatePlanForm = formbuilder.group({
      pname: ['', Validators.compose([Validators.required])],
      price_per_month: ['', Validators.compose([Validators.required])],
      plantype : ['', Validators.compose([Validators.required])],
      currency: [''],
      status: [''],
      inter_val: [''],
      trial_periods: [''],
      type: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit_id = params.sp_id;
    });
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/editsubscriptionplan/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
     this.spinnerService.hide();
     this.updatePlanForm.setValue({
      pname: response.data[0].pname,
      price_per_month: response.data[0].price_per_month,
      plantype: response.data[0].plantype,
      // description: response.data[0].description,
       status: response.data[0].status.toString(),
       type: response.data[0].type.toString(),
       inter_val: response.data[0].inter_val,
       currency: response.data[0].currency,
       trial_periods: response.data[0].trial_periods,
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
    const updatecontent = this.updatePlanForm.value;
    updatecontent.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/updatesubscriptionplan?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/subscriptionplan');
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
