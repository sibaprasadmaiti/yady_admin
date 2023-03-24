import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.scss']
})
export class CityAddComponent implements OnInit {
	
	logtoken = localStorage.getItem('LoginToken');
	countryData: any;
	stateData: any;
	cityData: any;
	zoneAddForm: FormGroup;

  constructor(private route: ActivatedRoute, public adminservice: ApiServiceService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public  vcr: ViewContainerRef,
    public formbuilder: FormBuilder,public HttpClient: HttpClient) { 
	
		this.zoneAddForm = formbuilder.group({
			country_id: [''],
			state_id: [''],
			city_id: [''],
			city_name: ['', Validators.compose([Validators.required])],
		});
	
	
	}

  ngOnInit() {
	  this.getCountryList();
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
		if(countryId) {
			this.adminservice.HttpGetReq(`admin/getStateList?token=${this.logtoken}&country_id=${countryId}`, true)
			.then(
				(response: any) => {
					this.stateData = response.data;
					//console.log(this.stateData);
				},
				(error) => {

				}
			);
		}
	}
	onChangeState(stateId: number) {
		//console.log('x',stateId);
		if(stateId) {
			this.adminservice.HttpGetReq(`admin/getCityList?token=${this.logtoken}&state_id=${stateId}`, true)
			.then(
				(response: any) => {
					this.cityData = response.data;
					//console.log(this.stateData);
				},
				(error) => {

				}
			);
		}
	}
	
	addZone() {
		const addcontent = this.zoneAddForm.value;
		console.log(addcontent);
		
		this.spinnerService.show();
		this.adminservice.HttpPostReq(`admin/addCity?token=${this.logtoken}`, addcontent, true)
		.then(
			(response: any) => {
				this.spinnerService.hide();
				this.toastr.success(response.message);
				//console.log('x',response.data);
				//this.router.navigateByUrl('/main/zone-places/'+response.data._id);
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
