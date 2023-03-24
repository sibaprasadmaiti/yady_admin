import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {ApiServiceService} from '../../services/api-service/api-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    public dialog: MatDialog,
    private router: Router,
    vcr: ViewContainerRef,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar) {
      this.loginForm = formbuilder.group({
        email : ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)])],
        password : ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])]

  });
     }

  ngOnInit() {
  }
  loginData() {
    this.spinnerService.show();
    let formValue = this.loginForm.value;
    this.adminservice.HttpPostReq('admin/login',formValue,true).then((response:any)=>{
      if(response.success == true){
                this.spinnerService.hide();
                localStorage.setItem('LoginToken', response.token);
                this.snackBar.open(response.message, 'End now', {
                  duration: 5000,
                });
                this.router.navigateByUrl('/main/dashboard');
              }
              else{
                this.spinnerService.hide();

                this.snackBar.open(response.message, 'End now', {
                  duration: 5000,
                });
              }
    })
  }
  openDialog() {
    let dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
