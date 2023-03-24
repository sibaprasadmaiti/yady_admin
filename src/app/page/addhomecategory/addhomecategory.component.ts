import { Component, OnInit,  ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';


@Component({
  selector: 'app-addhomecategory',
  templateUrl: './addhomecategory.component.html',
  styleUrls: ['./addhomecategory.component.scss']
})
export class AddhomecategoryComponent implements OnInit {
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
    // this.toastr.setRootViewContainerRef(vcr);
    this.addForm = formbuilder.group({
        categoryname: ['', Validators.compose([Validators.required])],
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
    this.adminservice.HttpPostReq(`admin/addhomecategory?token=${this.logtoken}`, addcontent, true)
    .then(
      (response:any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       this.router.navigateByUrl('/main/homecategory');
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
