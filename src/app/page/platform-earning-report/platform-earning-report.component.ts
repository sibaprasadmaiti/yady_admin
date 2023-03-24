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
  selector: 'app-platform-earning-report',
  templateUrl: './platform-earning-report.component.html',
  styleUrls: ['./platform-earning-report.component.scss']
})
export class PlatformEarningReportComponent implements OnInit {
  searchForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  page = 1;
  perPage = 5;
  totalRecords: any = 0;
  countryData: any[] = [];
  stateData: any[] = [];
  cityData: any[] = [];
  platformEarningData: any[] = [];
  csvExportArray: any[] = [];
  countryId: any = 0;
  stateId: any = 0;
  cityId: any = 0;


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
      from_date: ['', Validators.compose([Validators.required])],
      to_date: ['', Validators.compose([Validators.required])],
      per_page: [''],
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

  searchData() {
    const searchContent = this.searchForm.value;
   // console.log("search content => ", searchContent);

    if (searchContent.per_page != "" && searchContent.per_page > 0) {
      this.perPage = searchContent.per_page;
    }
    const fd = new Date(searchContent.from_date);
    const td = new Date(searchContent.to_date);
    const fromDate = fd.getFullYear() + "-" + ((fd.getMonth() + 1) < 10 ? '0' + (fd.getMonth() + 1) : (fd.getMonth() + 1)) + "-" + (fd.getDate() < 10 ? '0' + fd.getDate() : fd.getDate());
    const toDate = td.getFullYear() + "-" + ((td.getMonth() + 1) < 10 ? '0' + (td.getMonth() + 1) : (td.getMonth() + 1)) + "-" + (td.getDate() < 10 ? '0' + td.getDate() : td.getDate());

    this.getPlatformEarningReport(fromDate, toDate, searchContent.country_id, searchContent.state_id, searchContent.city_id);
  }

  getPlatformEarningReport(from_date: any,to_date: any,country_id: any,state_id: any,city_id: any) {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/platformEarningReport/?token=${this.logtoken}&from_date=${from_date}&to_date=${to_date}&country_id=${country_id}&state_id=${state_id}&city_id=${city_id}`, true)
      .then(
        (response: any) => {
          console.log("platform wise report responce => ", response);
          if (response.success == true) {
            this.platformEarningData = response.data;
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
    for (let i = 0; i < this.platformEarningData.length; i++) {
      const obj = {
        invoice_no: this.platformEarningData[i].booking_job_no,
        booking_date: this.platformEarningData[i].booking_date,
        booking_time: this.platformEarningData[i].booking_time,
        service_name: this.platformEarningData[i].cat_subcat_name,
        provider_name: this.platformEarningData[i].provider_name,
        requester_name: this.platformEarningData[i].requester_name,
        location: this.platformEarningData[i].country + ", " + this.platformEarningData[i].state + ", " + this.platformEarningData[i].city,
        tax: this.platformEarningData[i].tax,
        total_earning: this.platformEarningData[i].total_earning,
        platform_fee: this.platformEarningData[i].platform_fee,
      }
      this.csvExportArray.push(obj);
    }
    // console.log("data ==> ", this.csvExportArray);

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: 'platform-earning-report',
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
