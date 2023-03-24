import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-editpaymentmessage',
  templateUrl: './editpaymentmessage.component.html',
  styleUrls: ['./editpaymentmessage.component.scss']
})
export class EditpaymentmessageComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public edit_id: any;
  updateForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) {this.updateForm = formbuilder.group({
      name: ['', Validators.compose([Validators.required])],
      value: ['', Validators.compose([Validators.required])]
      // status: ['']
    });
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit_id = params.pm_id;
    });
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/editPaymentMessage/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
     this.spinnerService.hide();
     this.updateForm.setValue({
      name: response.data[0].name,
      value: response.data[0].value,
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

  updatemessageData() {
    this.spinnerService.show();
    const updatecontent = this.updateForm.value;
    updatecontent.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/adminUpdatePaymentmessage?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/paymentmessagesettinglist');
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
