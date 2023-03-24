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
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit {

  logtoken = localStorage.getItem('LoginToken');
  adminType: any;
  adminCity: any;
  page = 1;
  transactionData: any[] = [];
  type: any = "";
  input_text: any = "";
  from_date: any = "";
  to_date: any = "";
  country_name: any = "";
  countryData: any[] = [];
  showhide: any;
  perPage = 5;
  totalRecords;
  csvExportArray: any[] = [];
  quotation_approval_permission = 0;
  checkboxChecked = false;
  bookingIdArray: any[] = [];
  haveOneSettlement = false;


  constructor(public adminservice: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          if (response.success) {
            this.adminType = response.data.admin_type;
            this.quotation_approval_permission = response.pdata.quotation_approval;
           // this.getTransactionList(this.type, this.input_text, this.from_date, this.to_date, this.country_name);
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
        },
        (error) => {
          console.log("Error => ", error);
        }
      );
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

  getTransactionList(type: any, input_text: any, from_date: any, to_date: any, country_name: any) {
    console.log("Search Type => ", type);
    console.log("Saearch Key => ", input_text);
    console.log("From date => ", from_date);
    console.log("To Date => ", to_date);
    console.log("country name => ", country_name);
    if(type == "" || type == null){
      alert("Please choose a option.");
      return false;
    }
    if(from_date == "" || from_date == null){
      alert("Please select from date.");
      return false;
    }
    if(to_date == "" || to_date == null){
      alert("Please select to date.");
      return false;
    }
	if(type == 1 && (country_name == "" || country_name == null))
	{
		alert("Please select country.");
		return false;
	}
		
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/getTransactionList/?token=${this.logtoken}&type=${type}&input_text=${input_text}&from_date=${from_date}&to_date=${to_date}&country_name=${country_name}`, true)
      .then(
        (response: any) => {
          console.log("transaction data responce => ", response);

          if (response.success == true) {
            this.transactionData = response.data;
            for (let i = 0; i < response.data.length; i++) {
             if(response.data[i].settlement_status == 0){
              this.haveOneSettlement = true;
              break;
             }

            }
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

  searchBooking() {
    this.getTransactionList(this.type, this.input_text, this.from_date, this.to_date, this.country_name);
  }

  reset_page() {
    this.type = "";
    this.input_text = "";
    this.from_date = "";
    this.to_date = "";
    this.country_name = "";
    this.transactionData = [];
  }

  checkUncheckAll(event: any) {
    this.bookingIdArray = [];
    if(event.checked){
      this.checkboxChecked = true;
      for (let i = 0; i < this.transactionData.length; i++) {
        if(this.transactionData[i].settlement_status == 0)
          this.bookingIdArray.push(this.transactionData[i]._id);
      }
    }else{
      this.checkboxChecked = false;
      this.bookingIdArray = [];
    }
  //  console.log("check uncheck array ==> ", this.bookingIdArray);

  }

  individualCheck(event: any, booking_id: any){
    if(event.checked){
      this.bookingIdArray.push(booking_id);
    }else{
      const index = this.bookingIdArray.indexOf(booking_id);
      if (index !== -1)
      this.bookingIdArray.splice(index, 1);
    }
   // console.log("individual check uncheck array ==> ", this.bookingIdArray);
  }

  processPayout(booking_id: any){
    this.bookingIdArray = [];
    this.bookingIdArray.push(booking_id);
    this.paymentSettlement();
  }

  paymentSettlement(){
    this.spinnerService.show();
    const formData = { booking_id: this.bookingIdArray };
    this.adminservice.HttpPostReq(`admin/paymentSettlement?token=${this.logtoken}`, formData, true)
		.then(
		  (response: any) => {
				if(response.success == true) {
					this.spinnerService.hide();
          this.bookingIdArray = [];
          this.checkboxChecked = false;
					this.toastr.success(response.message);
				} else {
					this.spinnerService.hide();
					this.toastr.error(response.message);
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
    for (let i = 0; i < this.transactionData.length; i++) {
      var obj = {
        invoice_no: this.transactionData[i].booking_job_no,
        service_name: this.transactionData[i].cat_subcat_name,
        provider_name: this.transactionData[i].provider_name,
        total_earnings: this.transactionData[i].total_earning,
        platform_fee: this.transactionData[i].platform_fee,
        sp_net_earning: this.transactionData[i].sp_net_earning,
      }
      this.csvExportArray.push(obj);
    }
    console.log("data ==> ", this.csvExportArray);

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: 'transaction-list',
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
