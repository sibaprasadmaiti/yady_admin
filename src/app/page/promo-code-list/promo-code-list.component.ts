import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { RouterModule, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-promo-code-list',
  templateUrl: './promo-code-list.component.html',
  styleUrls: ['./promo-code-list.component.scss']
})
export class PromoCodeListComponent implements OnInit {

  logtoken = localStorage.getItem('LoginToken');
  page = 1;
  showColor = false;
  showInfo = false;
  promotionData: any;
  imageButtons = [{ src: 'tickg.png', name: 'tickg' },
  { src: 'cross.png', name: 'cross' }];
  city_id = "";
  state_id = "";
  country_id = "";
  adminType = 0;

  constructor(public adminservice: ApiServiceService,
    private router: Router,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          console.log("Profile details => ", response);
          this.adminType = response.data.admin_type;
          if (response.data.admin_type == 3) {
            this.city_id = response.data.city_id;
          }
          if (response.data.admin_type == 2) {
            this.state_id = response.data.state_id;
          }
          if (response.data.admin_type == 1) {
            this.country_id = response.data.country_id;
          }
          this.promoCodeList();
        },
        (error) => {
          console.log("Error => ", error);
        }
      );

  }

  promoCodeList() {
    this.spinnerService.show();
    console.log("city id => ", this.city_id);
    console.log("state id => ", this.state_id);
    console.log("country id => ", this.country_id);

    this.adminservice.HttpGetReq(`admin/promoCodeList/?token=${this.logtoken}&city_id=${this.city_id}&state_id=${this.state_id}&country_id=${this.country_id}`, true)
      .then(
        (response: any) => {
          this.promotionData = response.data;
          this.spinnerService.hide();
          this.toastr.success(response.message);
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
  addNew() {
    this.router.navigateByUrl('/main/promo-code-add');
  }
  editPromoCode(id: any) {
    this.router.navigateByUrl('/main/promo-code-edit/' + id);
  }

}
