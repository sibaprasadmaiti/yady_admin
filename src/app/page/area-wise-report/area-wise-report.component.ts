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
  selector: 'app-area-wise-report',
  templateUrl: './area-wise-report.component.html',
  styleUrls: ['./area-wise-report.component.scss']
})
export class AreaWiseReportComponent implements OnInit {
  searchForm: FormGroup;
  logtoken = localStorage.getItem('LoginToken');
  page = 1;
  perPage = 5;
  totalRecords: any = 0;
  from_date: any = "";
  to_date: any = "";
  city_id: any = "";
  state_id: any = "";
  country_id: any = "";
  countryData: any[] = [];
  stateData: any[] = [];
  cityData: any[] = [];
  areaWiseData: any[] = [];
  csvExportArray: any[] = [];
  type: any = 0;

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
    //console.log('x',countryId);
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
    //console.log('x',stateId);
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

  getAreaWiseReport(type: any,from_date: any,to_date: any,country_id: any,state_id: any,city_id: any){
    this.spinnerService.show();
   // this.searchForm.reset();
    this.adminservice.HttpGetReq(`admin/areaWiseReport/?token=${this.logtoken}&type=${type}&from_date=${from_date}&to_date=${to_date}&country_id=${country_id}&state_id=${state_id}&city_id=${city_id}`, true)
      .then(
        (response: any) => {
          console.log("transaction data responce => ", response);

          if (response.success == true) {

            this.areaWiseData = response.data;
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

  searchData(){
    const searchContent = this.searchForm.value;
    if(searchContent.per_page !="" && searchContent.per_page > 0){
      this.perPage = searchContent.per_page;
    }

    const fd = new Date(searchContent.from_date);
    const td = new Date(searchContent.to_date);
    const fromDate = fd.getFullYear() + "-" + ((fd.getMonth()+1) < 10 ? '0' + (fd.getMonth()+1) : (fd.getMonth()+1)) + "-" + (fd.getDate() < 10 ? '0' + fd.getDate() : fd.getDate());
    const toDate = td.getFullYear() + "-" + ((td.getMonth()+1) < 10 ? '0' + (td.getMonth()+1) : (td.getMonth()+1)) + "-" + (td.getDate() < 10 ? '0' + td.getDate() : td.getDate());
    console.log(fromDate);
    console.log(toDate);
    this.getAreaWiseReport(this.type,fromDate,toDate,searchContent.country_id,searchContent.state_id,searchContent.city_id);
  }

  searchReportByStatus(type: any){
    const searchContent = this.searchForm.value;
    if(searchContent.from_date !='' && searchContent.to_date !=''){
      const fd = new Date(searchContent.from_date);
      const td = new Date(searchContent.to_date);
      const fromDate = fd.getFullYear() + "-" + ((fd.getMonth()+1) < 10 ? '0' + (fd.getMonth()+1) : (fd.getMonth()+1)) + "-" + (fd.getDate() < 10 ? '0' + fd.getDate() : fd.getDate());
      const toDate = td.getFullYear() + "-" + ((td.getMonth()+1) < 10 ? '0' + (td.getMonth()+1) : (td.getMonth()+1)) + "-" + (td.getDate() < 10 ? '0' + td.getDate() : td.getDate());
      this.getAreaWiseReport(type,fromDate,toDate,searchContent.country_id,searchContent.state_id,searchContent.city_id);
    }else{
      this.type = type;
    }
  }

  exportCsv() {
    this.csvExportArray = [];
    for (let i = 0; i < this.areaWiseData.length; i++) {
      const obj = {
        invoice_no: this.areaWiseData[i].booking_job_no,
        booking_date: this.areaWiseData[i].booking_date,
        booking_time: this.areaWiseData[i].booking_time,
        service_name: this.areaWiseData[i].cat_subcat_name,
        provider_name: this.areaWiseData[i].provider_name,
        requester_name: this.areaWiseData[i].requester_name,
        location: this.areaWiseData[i].country + ", " + this.areaWiseData[i].state + ", " + this.areaWiseData[i].city,
        before_tax_cost: this.areaWiseData[i].before_tax_cost,
        tax: this.areaWiseData[i].tax,
        after_tax_cost: this.areaWiseData[i].after_tax_cost,
        additional_part_cost: this.areaWiseData[i].additional_part_cost,
        additional_time_cost: this.areaWiseData[i].additional_time_cost,
        reschedule_cost: this.areaWiseData[i].reschedule_cost,
        used_wallet_money: this.areaWiseData[i].wallet_pay_status == 1 ? this.areaWiseData[i].used_wallet_money : 0,
        total_cost: this.areaWiseData[i].total_cost + this.areaWiseData[i].additional_part_cost +this.areaWiseData[i].additional_time_cost + this.areaWiseData[i].reschedule_cost,
      }
      this.csvExportArray.push(obj);
    }
    // console.log("data ==> ", this.csvExportArray);

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: 'area-wise-report-list',
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
