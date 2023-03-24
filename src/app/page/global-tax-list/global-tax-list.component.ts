import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';

@Component({
  selector: 'app-global-tax-list',
  templateUrl: './global-tax-list.component.html',
  styleUrls: ['./global-tax-list.component.scss']
})
export class GlobalTaxListComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	page = 1;
	adminType: any;
	city_id: any;
	state_id: any;
	country_id: any;
	tax_list: any;
	searchForm: FormGroup;
	countryData: any[] = [];
	stateData: any[] = [];
	cityData: any[] = [];

  constructor(public adminservice: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { 
	
		this.searchForm = formbuilder.group({
			country_id: ['', Validators.compose([Validators.required])],
			state_id: ['', Validators.compose([Validators.required])],
			city_id: ['', Validators.compose([Validators.required])],
		});
		
	}

  ngOnInit() {
	  this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
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
          this.bannerList();
        },
        (error) => {
          console.log("Error => ", error);
        }
      );
    }
	
	getCountryList() {
		this.adminservice.HttpGetReq(`admin/getCountryList?token=${this.logtoken}`, true)
		.then(
			(response: any) => {
				this.countryData = response.data;
				//console.log(this.countryData);
			},
			(error) => {

			}
		);
	}
	onChangeCountry(countryId: number) {
		//console.log('x',countryId);
		this.stateData = [];
		if(countryId) {
			this.spinnerService.show();
			this.adminservice.HttpGetReq(`admin/getStateList?token=${this.logtoken}&country_id=${countryId}`, true)
			.then(
				(response: any) => {
					this.stateData = response.data;
					//console.log(this.stateData);
					this.spinnerService.hide();
				},
				(error) => {
					this.spinnerService.hide();
				}
			);
		}
	}
	onChangeState(stateId: number) {
		//console.log('x',stateId);
		this.cityData = [];
		if(stateId) {
			this.spinnerService.show();
			this.adminservice.HttpGetReq(`admin/getCityList?token=${this.logtoken}&state_id=${stateId}`, true)
			.then(
				(response: any) => {
					this.cityData = response.data;
					//console.log(this.stateData);
					this.spinnerService.hide();
				},
				(error) => {
					this.spinnerService.hide();
				}
			);
		}
	}
	
	bannerList(){
		if(this.adminType == 0){
			this.getCountryList();
			const searchcontent = this.searchForm.value;
			this.country_id = searchcontent.country_id;
			this.state_id = searchcontent.state_id;
			this.city_id = searchcontent.city_id;
		}
		console.log("city id => ", this.city_id);
		console.log("state id => ", this.state_id);
		console.log("country id => ", this.country_id);

		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/taxList/?token=${this.logtoken}&country_id=${this.country_id}&state_id=${this.state_id}&city_id=${this.city_id}&admin_type=${this.adminType}`, true)
		.then(
			(response: any) => {
			
				if(response.success == true) {
					this.tax_list = response.data;
					this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
					this.tax_list = [];
					this.spinnerService.hide();
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
	
	addtax(){
		this.router.navigateByUrl('/main/save-tax');
	}
	editTax(tax_id) {
		this.router.navigateByUrl('/main/tax-edit/'+tax_id);
	}

}
