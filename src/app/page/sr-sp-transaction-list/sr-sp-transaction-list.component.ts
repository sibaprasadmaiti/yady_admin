import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../environments/environment';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-sr-sp-transaction-list',
  templateUrl: './sr-sp-transaction-list.component.html',
  styleUrls: ['./sr-sp-transaction-list.component.scss']
})
export class SrSpTransactionListComponent implements OnInit {
  public user_id: any;
	logtoken = localStorage.getItem('LoginToken');
	user_type;
  srTransactionList: any[] = [];
  csvExportArray: any[] = [];
  page = 1;
  perPage = 5;

  constructor(private route: ActivatedRoute,
              public formbuilder: FormBuilder,
              public adminservice: ApiServiceService,
              public toastr: ToastrService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user_id = params.user_id;
      this.user_type = params.user_type;
    });
    this.getUserWallet(this.user_id)
  }

  getUserWallet(user_id) {
		this.spinnerService.show();
		this.adminservice.HttpGetReq(`admin/getSRSPTransactionList/?token=${this.logtoken}&user_id=${user_id}`, true)
		.then((response: any) => {
      console.log("sr sp transaction list ", response);

			this.spinnerService.hide();
			if(response.success) {
        this.srTransactionList = response.data;
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

  backtolist() {
    this.router.navigateByUrl('/main/user-wallet/'+this.user_id+'/'+this.user_type);
  }

  exportCsv() {
    this.csvExportArray = [];
    for (let i = 0; i < this.srTransactionList.length; i++) {
      const obj = {
        booking_type: this.srTransactionList[i].booking_type,
        transaction_date: this.srTransactionList[i].date,
        description: this.srTransactionList[i].description,
        transaction_amount: this.srTransactionList[i].transact_type == 0 ? '+'+this.srTransactionList[i].transact_money : '-'+this.srTransactionList[i].transact_money,
      }
      this.csvExportArray.push(obj);
    }
    // console.log("data ==> ", this.csvExportArray);

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: 'wallet-transaction',
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
