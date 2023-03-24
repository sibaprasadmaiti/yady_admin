import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';

@Component({
  selector: 'app-addpaymentmessage',
  templateUrl: './addpaymentmessage.component.html',
  styleUrls: ['./addpaymentmessage.component.scss']
})
export class AddpaymentmessageComponent implements OnInit {
  addForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  addcontent: any;
  constructor(
    public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder,
  ) {
    this.addForm = formbuilder.group({
      name: ['', Validators.compose([Validators.required])],
      value: ['', Validators.compose([Validators.required])],
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
    // this.adminservice.HttpGetReq(`admin/homecategorylist?token=${this.logtoken}`, true)
    this.adminservice.HttpPostReq(`admin/adminAddpayMentmessage?token=${this.logtoken}`, addcontent, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       this.router.navigateByUrl('/main/paymentmessagesettinglist');
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
