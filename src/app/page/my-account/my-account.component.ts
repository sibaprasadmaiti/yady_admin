import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  public updateForm: FormGroup;
  public profileData: any;
  logtoken = localStorage.getItem('LoginToken');
  constructor(public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              private router: Router,
              public snackBar: MatSnackBar,
              private spinnerService: Ng4LoadingSpinnerService) {
      this.updateForm = formbuilder.group({
        name : ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
        username : ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
        email : [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      });
    }

    ngOnInit() {
      this.profileData = {};
      this.spinnerService.show();
      this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          console.log("Profile details => ", response);

          this.spinnerService.hide();
          this.profileData = response.data;
          this.updateForm.setValue({
            name:  this.profileData.name,
            username: this.profileData.user_name,
            email: this.profileData.email,
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

      updateData() {
        this.spinnerService.show();
        const updateprofileData = this.updateForm.value;
        this.adminservice.HttpPostReq(`admin/updateadminprofile?token=${this.logtoken}`, updateprofileData, true)
        .then(
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

      }
