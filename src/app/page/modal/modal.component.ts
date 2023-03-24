import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // private modalData: any;
  form: FormGroup;
  public fromflag: any;
  logtoken = localStorage.getItem('LoginToken');
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public modalData: any,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              public snackBar: MatSnackBar,
              private spinnerService: Ng4LoadingSpinnerService,
               ) {
                this.form = formbuilder.group({
                  subject: ['', Validators.compose([Validators.required])],
                  description: ['', Validators.compose([Validators.required])],
                  to: [{value: '', readonly : false } ],
                  name: [''],
                  password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
                  confirmnewpassword : ['', Validators.compose([Validators.required, this.equalpass('password')])]
            });

                }

  ngOnInit() {
    this.modalData = this.modalData;
    this.fromflag = this.modalData.flag;
    console.log('-------modal component------', this.modalData, '+++++++++');
    this.form.setValue({
      to: this.modalData.to,
      subject: '',
      description: '',
      password: '',
      confirmnewpassword: '',
      name: this.modalData.name,
       });

    console.log('-------modal flag ------',  this.fromflag, '+++++++++');
  }

  actionFunction() {
    // alert("I am a work in progress");
    this.spinnerService.show();
    const sendData = this.form.value;
    // sendData.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/addEmailNotification?token=${this.logtoken}`, sendData, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        // this.router.navigateByUrl('/main/user-management');
        this.closeModal();
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

  actionFunctionUpdate() {
    // alert("I am a work in progress 45");
    this.spinnerService.show();
    const sendData = this.form.value;
    console.log('<>', sendData);
    // sendData.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/changeUserPass?token=${this.logtoken}`, sendData, true)
     .then((response: any) => {
       if (response.success === true) {
        this.spinnerService.hide();
        this.snackBar.open(response.message, 'End now', {
          duration: 5000,
        });
        // this.router.navigateByUrl('/main/user-management');
        this.closeModal();
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



  closeModal() {
    this.dialogRef.close();
  }

  equalpass(confirmnewpassword): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const input = control.value;
      const isValid = control.root.value['newpassword'] === input;
      if (!isValid) {
        return { 'equalpass': {isValid} };
      } else {
        return null;
      }
    };
  }

}
