import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
@Component({
  selector: 'app-adddriver',
  templateUrl: './adddriver.component.html',
  styleUrls: ['./adddriver.component.scss']
})
export class AdddriverComponent implements OnInit {
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
    public formbuilder: FormBuilder)
    {

      this.addForm = formbuilder.group(
          {
          name: ['', Validators.compose([Validators.required])],
          email : ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)])],
          contact : ['', Validators.compose([Validators.required])],
          username: ['', Validators.compose([Validators.required])],
          password: ['', Validators.compose([Validators.required])],
          cpassword: ['', Validators.compose([Validators.required])]
        }, /*,{ validator: this.matchValidator});*/
        {
          validator: this.ConfirmedValidator('password', 'cpassword')
        }
      );
    }
     matchValidator(group: FormGroup) { // here we have the 'passwords' group
  const password = group.get('password').value;
  const confirmPassword = group.get('cpassword').value;

  return password === confirmPassword ? null : { required: true }
}
ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
           return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

  ngOnInit() {
  }

  addData() {
    this.spinnerService.show();
    console.log('999999');
    // let updatejob = this.updatejobForm.value;
    const addcontent = this.addForm.value;
   // updatejob.id = this.edit_job;
    console.log('addcontent:', addcontent);
    // this.adminservice.HttpGetReq(`admin/homecategorylist?token=${this.logtoken}`, true)
    this.adminservice.HttpPostReq(`admin/driverinsert?token=${this.logtoken}`, addcontent, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       if (response.message.success === true){
        this.toastr.success(response.message);
        this.router.navigateByUrl('/main/driver');
       } else {
        this.toastr.success(response.message);
       }


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
