import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MatTabChangeEvent, VERSION } from '@angular/material';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-sp-wise-report',
  templateUrl: './sp-wise-report.component.html',
  styleUrls: ['./sp-wise-report.component.scss']
})
export class SpWiseReportComponent implements OnInit {
  searchForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  page = 1;
  perPage = 5;
  totalRecords: any = 0;
  countryData: any[] = [];
  stateData: any[] = [];
  cityData: any[] = [];
  spWiseData: any[] = [];
  csvExportArray: any[] = [];
  spList: any[] = [];
  countryId: any = 0;
  stateId: any = 0;
  cityId: any = 0;
  filteredOptions;
  sp_id: any;


  constructor(public adminservice: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) {
      this.searchForm = formbuilder.group({
        country_id: [''],
        state_id: [''],
        city_id: [''],
        service_provider_id: ['', Validators.compose([Validators.required])],
        from_date: ['', Validators.compose([Validators.required])],
        to_date: ['', Validators.compose([Validators.required])],
        per_page: [''],
      });
    }

  ngOnInit() {
    this.getCountryList();
    this.searchForm.get('service_provider_id').valueChanges.subscribe(response => {
      this.filterData(response);
    })
  }

  filterData(enteredData){
    this.filteredOptions = this.spList.filter(item => {
      let name = item.first_name + ' ' + item.last_name;
      return name.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  getCountryList() {
    this.adminservice.HttpGetReq(`admin/getCountryList?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.countryData = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChangeCountry(countryId: number) {
   this.countryId = countryId;
    this.stateData = [];
    if (countryId) {
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
   this.stateId = stateId;
    this.cityData = [];
    if (stateId) {
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

  onChangeCity(cityId: number) {
    this.cityId = cityId;
    this.getSpForReport();
  }

  getSpForReport(){
    this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getSrForSendNotification/?token=${this.logtoken}&country_id=${this.countryId}&state_id=${this.stateId}&city_id=${this.cityId}&adminType=0&user_type=2`, true)
		.then(
			(response: any) => {
			//	console.log("SP list for notification responce => ", response);
				if(response.success == true) {
					this.spList = response.data;
          this.filteredOptions = response.data;
          this.spinnerService.hide();
					this.toastr.success(response.message);
				} else {
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

  getId(value: any){
    this.sp_id = value;
   }

  searchData(){
    const searchContent = this.searchForm.value;
    //console.log("search content => ", searchContent);

    if(searchContent.per_page !="" && searchContent.per_page > 0){
      this.perPage = searchContent.per_page;
    }
    const fd = new Date(searchContent.from_date);
    const td = new Date(searchContent.to_date);
    const fromDate = fd.getFullYear() + "-" + ((fd.getMonth()+1) < 10 ? '0' + (fd.getMonth()+1) : (fd.getMonth()+1)) + "-" + (fd.getDate() < 10 ? '0' + fd.getDate() : fd.getDate());
    const toDate = td.getFullYear() + "-" + ((td.getMonth()+1) < 10 ? '0' + (td.getMonth()+1) : (td.getMonth()+1)) + "-" + (td.getDate() < 10 ? '0' + td.getDate() : td.getDate());
    // console.log(fromDate);
    // console.log(toDate);
    this.srWiseReport(fromDate,toDate,this.sp_id);
  }

  srWiseReport(from_date: any, to_date: any, service_provider_id: any) {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/spWiseReport/?token=${this.logtoken}&from_date=${from_date}&to_date=${to_date}&service_provider_id=${service_provider_id}`, true)
      .then(
        (response: any) => {
          console.log("SP wise report responce => ", response);
          if (response.success == true) {
            this.spWiseData = response.data;
            this.spinnerService.hide();
            this.toastr.success(response.message);
          } else {
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

  exportCsv() {
    this.csvExportArray = [];
    for (let i = 0; i < this.spWiseData.length; i++) {
      const obj = {
        invoice_no: this.spWiseData[i].booking_job_no,
        booking_date: this.spWiseData[i].booking_date,
        booking_time: this.spWiseData[i].booking_time,
        service_name: this.spWiseData[i].cat_subcat_name,
        provider_name: this.spWiseData[i].provider_name,
        requester_name: this.spWiseData[i].requester_name,
        location: this.spWiseData[i].country + ", " + this.spWiseData[i].state + ", " + this.spWiseData[i].city,
        before_tax_cost: this.spWiseData[i].before_tax_cost,
        tax: this.spWiseData[i].tax,
        after_tax_cost: this.spWiseData[i].after_tax_cost,
        additional_part_cost: this.spWiseData[i].additional_part_cost,
        additional_time_cost: this.spWiseData[i].additional_time_cost,
        reschedule_cost: this.spWiseData[i].reschedule_cost,
        used_wallet_money: this.spWiseData[i].wallet_pay_status == 1 ? this.spWiseData[i].used_wallet_money : 0,
        total_cost: this.spWiseData[i].total_cost + this.spWiseData[i].additional_part_cost +this.spWiseData[i].additional_time_cost + this.spWiseData[i].reschedule_cost,

      }
      this.csvExportArray.push(obj);
    }
    // console.log("data ==> ", this.csvExportArray);

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: 'sp-wise-report',
      //showLabels: true,
      //showTitle: true,
      // title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      //  headers: ['Booking Job No.', 'Service Requester Name']
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.csvExportArray);
  }

}
