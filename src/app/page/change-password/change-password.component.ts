import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changepasswordForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  constructor(public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    private router: Router,
    public snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService,
    vcr: ViewContainerRef) { 
      this.changepasswordForm = formbuilder.group({
        currentpassword : ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
        newpassword : ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
        confirmnewpassword : ['', Validators.compose([Validators.required, this.equalto('password')])]
      });
    }
    
    ngOnInit() {
    }
    changepass() {
      this.spinnerService.show();
      const changepassData = this.changepasswordForm.value;
      this.adminservice.HttpPostReq(`admin/changepassword?token=${this.logtoken}`, changepassData, true) .then(
        (response: any) => {
          if (response.success === true) {
            this.spinnerService.hide();
            this.snackBar.open(response.message, 'End now', {
              duration: 5000,
            });
            this.router.navigateByUrl('/main/dashboard');
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
      equalto(confirmnewpassword): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
          const input = control.value;
          const isValid = control.root.value['newpassword'] === input;
          if (!isValid) {
            return { 'equalTo': {isValid} };
          } else {
            return null;
          }
        };
      }
    }
    