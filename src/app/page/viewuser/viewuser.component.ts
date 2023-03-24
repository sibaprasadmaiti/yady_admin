import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
//import { environment } from 'New folder/src/environments/environment';


@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {
  public edit_id: any;
  public addfaqcategory: any;
  category: any;
  updateUserForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  isDisabled: any;
  userType: any;
  // tslint:disable-next-line:variable-name
  registered_on: any;
  streetname: any;
  // tslint:disable-next-line:variable-name
  user_imgpath: any;
  image: any;
  // tslint:disable-next-line:whitespace
  obj:any;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
    // tslint:disable-next-line:variable-name
              private _location: Location,
              public snackBar: MatSnackBar) {
      this.updateUserForm = formbuilder.group({
        name: [{value: '', disabled: true}],
        // about_us: [{value: '', disabled: true}],
        email: [{value: '', disabled: true}],
        mobile_number: [{value: '', disabled: true}],
        streetname: [{value: '', disabled: true}],
        house_number: [{value: '', disabled: true}],
        postcode: [{value: '', disabled: true}],
        // unique_id: [{value: '', disabled: true}],
        // unique_id_number: [{value: '', disabled: true}],
        // type: [{value: '', disabled: true}],
        registered_on: [{value: '', disabled: true}],
        status: ['']
  });
      //this.user_imgpath = environment.api_url+'public/userimage/';
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit_id = params.u_id;
    });
    this.viewuser();
  }

  viewuser()  {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/viewuser/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
      this.userType = response.data[0].type;
      // this.registered_on = response.data[0].registered_on;
      // this.unique_id_number = response.data[0].unique_id_number;
      // this.image =
      this.obj = {
        name : response.data[0].name,
        image: response.data[0].image,
        // about_us: response.data[0].about_us,
        email: response.data[0].email,
        mobile_number: response.data[0].mobile_number,
        streetname: response.data[0].streetname,
        house_number: response.data[0].house_number,
        // address: response.data[0].address,
        // unique_id : response.data[0].unique_id,
        // unique_id_number: response.data[0].unique_id_number,
        // type: response.data[0].type,
        registered_on: response.data[0].registered_on,
       // status: response.data[0].status.toString(),
       status: response.data[0].status.toString()
         }
      this.spinnerService.hide();
      this.updateUserForm.patchValue(this.obj);
      console.log('<>', response.data[0].status);

    },
   (error) => {
     this.spinnerService.hide();
     this.snackBar.open('Internal server error', 'End now', {
       duration: 5000,
     });
   }
   );

  }

  updateUserStatusData() {
    this.spinnerService.show();
    const updatecontent = this.updateUserForm.value;
    updatecontent.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/updateUserStatus?token=${this.logtoken}`, updatecontent, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        this.router.navigateByUrl('/main/user-management');
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

  backClicked() {
    this._location.back();
  }


}
