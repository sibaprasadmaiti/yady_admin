import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
//import { environment } from 'New folder/src/environments/environment';

@Component({
  selector: 'app-emailnotification',
  templateUrl: './emailnotification.component.html',
  styleUrls: ['./emailnotification.component.scss']
})
export class EmailnotificationComponent implements OnInit {
  public edit_id: any;
  public addfaqcategory: any;
  category: any;
  updateUserForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  isDisabled: any;
  userType: any;
  registered_on: any;
  unique_id_number: any;
  user_imgpath: any;
  image: any;
  obj:any;
  public messagelist: any;
  constructor(private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public adminservice: ApiServiceService,
    public toastr: ToastrService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar) {

      this.updateUserForm = formbuilder.group({
        email: [{value: '', disabled: true}],
       /* subject: [{value: '', disabled: true}],*/
        description: [{value: '', disabled: true}],
        created_at: [{value: '', disabled: true}]
  });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit_id = params.u_id;
    });
    if (this.edit_id > 0) {
      this.getEmailList();
    } else {
      this.viewEmailList();
    }

  }

  getEmailList()  {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/viewEmailNotification/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
      this.messagelist = response.data;

      // this.userType = response.data[0].type;
      // this.registered_on = response.data[0].registered_on;
      // this.unique_id_number = response.data[0].unique_id_number;
      // this.image =
      // this.obj = {
      //   email: response.data[0].emailTo,
      //   subject: response.data[0].emailSubject,
      //   description: response.data[0].description,
      //   created : response.data[0].created
      //   }
      this.spinnerService.hide();
      this.updateUserForm.patchValue(this.obj);
      console.log('<>');

    },
   (error) => {
     this.spinnerService.hide();
     this.snackBar.open('Internal server error', 'End now', {
       duration: 5000,
     });
   }
   );

  }

  viewEmailList()  {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/viewEmailNotificationlist/?token=${this.logtoken}`, true)
    .then((response: any) => {
      this.messagelist = response.data;

      // this.userType = response.data[0].type;
      // this.registered_on = response.data[0].registered_on;
      // this.unique_id_number = response.data[0].unique_id_number;
      // this.image =
      // this.obj = {
      //   email: response.data[0].emailTo,
      //   subject: response.data[0].emailSubject,
      //   description: response.data[0].description,
      //   created : response.data[0].created
      //   }
      this.spinnerService.hide();
      this.updateUserForm.patchValue(this.obj);
      console.log('<>');

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
