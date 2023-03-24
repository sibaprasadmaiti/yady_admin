import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
//import { environment } from 'New folder/src/environments/environment';
// import { ModalComponent } from '../modal/modal.component';
import { CustomermodalComponent } from '../customermodal/customermodal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-viewcontactmsg',
  templateUrl: './viewcontactmsg.component.html',
  styleUrls: ['./viewcontactmsg.component.scss']
})
export class ViewcontactmsgComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public edit_id: any;
  public addfaqcategory: any;
  category: any;
  updateUserForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  isDisabled: any;
  userType: any;
  // tslint:disable-next-line:variable-name
  registered_on: any;
  // tslint:disable-next-line:variable-name
  unique_id_number: any;
  // tslint:disable-next-line:variable-name
  user_imgpath: any;
  image: any;
  obj: any;
  id: any;
  userInfo: any;

  public messagelist: any;
  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog,
    ) {
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
      this.viewCustomerList();
    }
  }

  getEmailList()  {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/viewcustomermsg/${this.edit_id}/?token=${this.logtoken}`, true)
    .then((response: any) => {
      this.messagelist = response.data;
      this.obj = {
        email: response.data[0].email,
        description: response.data[0].description,
        created_at: response.data[0].created_at
      }
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

  viewCustomerList()  {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/viewcustomermsg/?token=${this.logtoken}`, true)
    .then((response: any) => {
      this.messagelist = response.data;
      this.obj = {
        email: response.data[0].email,
        description: response.data[0].description,
        created_at: response.data[0].created_at
      }
      //
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

  openModal(id: any) {  // alert('ho....');
                        this.adminservice.HttpGetReq(`admin/userinfo/${id}/?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
       this.userInfo = response.data;
       this.spinnerService.hide();
       // this.toastr.success(response.message);
       const dialogConfig = new MatDialogConfig();
       // The user can't close the dialog by clicking outside its body
       dialogConfig.disableClose = true;
       dialogConfig.id = 'modal-component';
       dialogConfig.height = '350px';
       dialogConfig.width = '600px';
       dialogConfig.data = {
         name: this.userInfo[0].name,
         to: this.userInfo[0].email,
         // title: "Are you sure you want to logout?",
         // description: "Pretend this is a convincing argument on why you shouldn't logout :)",
         // actionButtonText: "Logout",
       };
       // https://material.angular.io/components/dialog/overview
       const modalDialog = this.matDialog.open(CustomermodalComponent, dialogConfig);

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
