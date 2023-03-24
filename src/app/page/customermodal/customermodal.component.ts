import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-customermodal',
  templateUrl: './customermodal.component.html',
  styleUrls: ['./customermodal.component.scss']
})
export class CustomermodalComponent implements OnInit {

  // private modalData: any;
  form: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  constructor(public dialogRef: MatDialogRef<CustomermodalComponent>,
              @Inject(MAT_DIALOG_DATA) public modalData: any,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              public snackBar: MatSnackBar,
              private spinnerService: Ng4LoadingSpinnerService,
               ) {
                this.form = formbuilder.group({
                  description: ['', Validators.compose([Validators.required])],
                  to: [{value: '', readonly : false } ],
                  name: [''],
            });

                }

  ngOnInit() {
    this.modalData = this.modalData;
    console.log('------custom modal-------', this.modalData, '+++++++++');
    this.form.setValue({
      to: this.modalData.to,
      description: '',
      name: this.modalData.name,
       });
  }

  actionFunction() {
    // alert("I am a work in progress");
    this.spinnerService.show();
    const sendData = this.form.value;
    // sendData.id = this.edit_id;
    this.adminservice.HttpPostReq(`admin/sendreply?token=${this.logtoken}`, sendData, true)
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

}
