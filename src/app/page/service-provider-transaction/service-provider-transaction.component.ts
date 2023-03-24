import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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
  selector: 'app-service-provider-transaction',
  templateUrl: './service-provider-transaction.component.html',
  styleUrls: ['./service-provider-transaction.component.scss']
})
export class ServiceProviderTransactionComponent implements OnInit {

	logtoken = localStorage.getItem('LoginToken');
	service_provider_id;
	transactionList: any[] = [];
	total_earning: any = 0;
	currency: any;
	onlineStatus: any;
	from_date: any = "";
  to_date: any = "";
  type: any = "";
  input_text: any = "";
  settlement_status: any = 0;
	page = 1;
  perPage = 5;
  csvExportArray: any[] = [];

  constructor(public adminservice: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
	this.route.params.subscribe(params => {
		this.service_provider_id = params.service_provider_id;
	});
	this.getSpTransaction(this.service_provider_id,this.type,this.input_text,this.from_date,this.to_date, this.settlement_status);
  }

  searchTransaction()
  {
    this.getSpTransaction(this.service_provider_id,this.type,this.input_text,this.from_date,this.to_date,this.settlement_status);
  }

	getSpTransaction(service_provider_id: any, type: any, input_text: any, from_date: any, to_date: any, settlement_status: any) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getSpWiseTransaction/?token=${this.logtoken}&service_provider_id=${service_provider_id}&type=${type}&input_text=${input_text}&from_date=${from_date}&to_date=${to_date}&settlement_status=${settlement_status}`, true)
		.then((response: any) => {
		console.log("transaction ", response);
			if(response.success === true) {
				this.spinnerService.hide();
				this.transactionList = response.data;
				this.total_earning = response.total;
				this.currency = response.data[0].currency;
				console.log(this.transactionList);
				this.snackBar.open(response.message, 'End now', {
					duration: 5000,
				});
			} else {
				this.spinnerService.hide();
				this.transactionList = [];
				this.total_earning = 0;
				this.currency = "";
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

  searchTransactionByStatus(settlement_status: any){
    this.getSpTransaction(this.service_provider_id,this.type,this.input_text,this.from_date,this.to_date, settlement_status);
  }

	reset_page() {
    this.from_date = "";
    this.to_date = "";
    this.type = "";
    this.input_text = "";
    this.settlement_status = 0;
		this.getSpTransaction(this.service_provider_id,this.type,this.input_text,this.from_date,this.to_date, this.settlement_status);
	}

  exportCsv() {
    this.csvExportArray = [];
    for (let i = 0; i < this.transactionList.length; i++) {
      var obj = {
        booking_no: this.transactionList[i].booking_job_no,
        location: this.transactionList[i].city + ', ' + this.transactionList[i].state + ', ' +this.transactionList[i].country,
        cost: this.transactionList[i].total_cost,
        additional_time_cost: this.transactionList[i].additional_time_cost,
        additional_part_cost: this.transactionList[i].additional_part_cost,
        reschedule_cost: this.transactionList[i].reschedule_cost,
        additional_cost: this.transactionList[i].addtional_total_cost,
        total_cost: this.transactionList[i].total_cost + this.transactionList[i].addtional_total_cost,
        platform_fee: this.transactionList[i].platform_fee,
        sp_net_earning: this.transactionList[i].sp_net_earning,
        currency: this.transactionList[i].currency,
      }
      this.csvExportArray.push(obj);
    }

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: 'sp-transaction-list',
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
