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
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  logtoken = localStorage.getItem('LoginToken');
  adminType: any;
  adminCity: any;
  page = 1;
  bookingData: any[] = [];
  search_type = "";
  search_key: null;
  booking_status = "booking-request";
  payment_type = "";
  from_date: null;
  to_date: null;
  country_id = "";
  city_id = "";
  countryData: any[] = [];
  stateData: any[] = [];
  cityData: any[] = [];
  showhide: any;
  perPage = 20;
  totalRecords;
  csvExportArray: any[] = [];
  countryId;
  stateId;
  country = "";
  state = "";
  quotation_approval_permission = 1;

  constructor(public adminservice: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public formbuilder: FormBuilder,
    public toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
      .then(
        (response: any) => {
          console.log('response.data', response.data);
          if(response.success){
            this.adminType = response.data.admin_type;
            if (this.adminType == 0) {
              this.quotation_approval_permission = 1;
            } else {
              this.quotation_approval_permission = response.pdata.quotation_approval;
            }

            if (response.data.admin_type == 3) {
              this.adminCity = response.data.city_id;
              this.city_id = response.data.city_id;
            }
            if (response.data.admin_type == 2) {
              this.state = response.data.state_id;
            }
            if (response.data.admin_type == 1) {
              this.country = response.data.country_id;
            }
            console.log(this.adminType);

            this.getBookingList(this.search_type, this.search_key, this.booking_status, this.payment_type, this.from_date, this.to_date, this.city_id, this.page, this.perPage);
          }else{
            this.toastr.error(response.message);
          }

        },
        (error) => {
          console.log("Error => ", error);
        }
      );

    this.getCountryList();
  }

  getBookingList(search_type: string, search_key: any, booking_status: string, payment_type: string, from_date: any, to_date: any, city_id: any, page: any, perPage: any) {
    this.showhide = booking_status;
    this.spinnerService.show();
    // console.log("Saearch Type => ", search_type);
    // console.log("Saearch Key => ", search_key);
    // console.log("Booking status => ", booking_status);
    // console.log("Payment Type => ", payment_type);
    // console.log("From date => ", from_date);
    // console.log("To Date => ", to_date);
    // console.log("City Id => ", city_id);
    // console.log("state Id => ", this.state);
    // console.log("country Id => ", this.country);
    // console.log("Page => ", page);
    // console.log("Per page => ", perPage);
    this.adminservice.HttpGetReq(`admin/getBookings/?token=${this.logtoken}&stype=${search_type}&key=${search_key}&status=${booking_status}&ptyp=${payment_type}&frmd=${from_date}&tod=${to_date}&cityId=${city_id}&page=${page}&perPage=${perPage}&countryId=${this.country}&stateId=${this.state}`, true)
      .then(
        (response: any) => {
          console.log("Booking list response => ", response);
          if (response.success == true) {
            this.bookingData = response.data;
            this.totalRecords = response.totalData;
            this.spinnerService.hide();
            this.toastr.success(response.message);
          } else {
            this.bookingData = [];
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

  onChangeCountry(countryId: any) {
    // console.log('x',countryId);
    this.country = countryId;
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
  onChangeState(stateId: any) {
    //console.log('x',stateId);
    this.state = stateId;
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

  assign_booking(booking_id) {
    this.router.navigateByUrl('/main/assign-booking/' + booking_id);
  }
  searchBooking(search_type: any, search_key: any, payment_type: string, from_date: any, to_date: any, city_id: any) {
    this.page = 1;
    this.getBookingList(search_type, search_key, this.booking_status, payment_type, from_date, to_date, city_id, this.page, this.perPage);
  }

  nextPage(page: any) {
    this.getBookingList(this.search_type, this.search_key, this.booking_status, this.payment_type, this.from_date, this.to_date, this.city_id, page, this.perPage);
  }

  reset_page() {
    //var booking_id = undefined;
    this.search_type = "";
    this.search_key = undefined;
    this.payment_type = "";
    this.from_date = undefined;
    this.to_date = undefined;
    this.city_id = "";
    this.country_id = "";
    this.stateData = [];
    this.cityData = [];
    this.page = 1;
    this.getBookingList(this.search_type, this.search_key, this.booking_status, this.payment_type, this.from_date, this.to_date, this.city_id, this.page, this.perPage);
  }
  searchBookingByStatus(booking_status: string) {
    this.booking_status = booking_status;
    this.page = 1;
    this.getBookingList(this.search_type, this.search_key, booking_status, this.payment_type, this.from_date, this.to_date, this.city_id, this.page, this.perPage);
  }
  viewDetails(booking_id: string) {
    this.router.navigateByUrl('/main/booking-details/' + booking_id);
  }

  adminApproval(booking_id: string, booking_pause_id: any) {
    this.router.navigateByUrl('/main/booking-quotation-approval/' + booking_id + '/' + booking_pause_id + '/' + 'a');
  }
  cancel_booking(booking_id: string) {
    this.page = 1;
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/cancelService?token=${this.logtoken}&booking_id=${booking_id}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.getBookingList(this.search_type, this.search_key, this.booking_status, this.payment_type, this.from_date, this.to_date, this.city_id, this.page, this.perPage);
          this.toastr.success(response.message);
        },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }

  complete_booking(booking_id: string) {
    this.page = 1;
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/completeService?token=${this.logtoken}&booking_id=${booking_id}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.getBookingList(this.search_type, this.search_key, this.booking_status, this.payment_type, this.from_date, this.to_date, this.city_id, this.page, this.perPage);
          this.toastr.success(response.message);
        },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }
  start_service(booking_id: string) {
    this.page = 1;
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/startService?token=${this.logtoken}&booking_id=${booking_id}`, true)
      .then(
        (response: any) => {
          this.spinnerService.hide();
          this.getBookingList(this.search_type, this.search_key, this.booking_status, this.payment_type, this.from_date, this.to_date, this.city_id, this.page, this.perPage);
          this.toastr.success(response.message);
        },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }

  exportCsv() {
    this.csvExportArray = [];
    for (let i = 0; i < this.bookingData.length; i++) {
      var bookingStatus = "";
      var rescheduleStatus = "";
      var paidMedium = "";
      var assignStatus = "";
      var totalCost = "";
      var addtional_total_cost = "";
      if (this.bookingData[i].booking_status == 0) {
        bookingStatus = "Pending, Not Accepted";
      } else if (this.bookingData[i].booking_status == 1) {
        bookingStatus = "Accepted and Upcoming";
      } else if (this.bookingData[i].booking_status == 2) {
        bookingStatus = "Completed";
      } else if (this.bookingData[i].booking_status == 3) {
        bookingStatus = "Ongoing";
      } else if (this.bookingData[i].booking_status == 4) {
        bookingStatus = "Cancel";
      }

      if (this.bookingData[i].reschedule_status == 1) {
        rescheduleStatus = "SR Rescheduled";
      }
      if (this.bookingData[i].sp_reschedule_status == 1 && this.bookingData[i].pause_type == 2 && this.bookingData[i].confirm_status == 0 && this.bookingData[i].admin_approval_status == 0 && this.bookingData[i].sp_reschedule_accepted_status == 0) {
        rescheduleStatus = "SP Submitted Dates, SR Acceptance Pending";
      }
      if (this.bookingData[i].sp_reschedule_status == 1 && this.bookingData[i].pause_type == 2 && this.bookingData[i].confirm_status == 0 && this.bookingData[i].admin_approval_status == 0 && this.bookingData[i].sp_reschedule_accepted_status == 1 && this.bookingData[i].cost == 0) {
        rescheduleStatus = "SR Accepted Res. Date";
      }
      if (this.bookingData[i].sp_reschedule_status == 1 && this.bookingData[i].pause_type == 2 && this.bookingData[i].confirm_status == 0 && this.bookingData[i].admin_approval_status == 0 && this.bookingData[i].sp_reschedule_accepted_status == 1 && this.bookingData[i].cost > 0) {
        rescheduleStatus = "SP Submitted Quote For Res.";
      }
      if (this.bookingData[i].sp_reschedule_status == 1 && this.bookingData[i].pause_type == 2 && this.bookingData[i].confirm_status == 0 && this.bookingData[i].admin_approval_status == 1 && this.bookingData[i].sp_reschedule_accepted_status == 1 && this.bookingData[i].cost > 0) {
        rescheduleStatus = "SP Submitted Quote For Res. Admin Approved";
      }
      if (this.bookingData[i].sp_reschedule_status == 1 && this.bookingData[i].pause_type == 2 && this.bookingData[i].confirm_status == 1 && this.bookingData[i].admin_approval_status == 1 && this.bookingData[i].sp_reschedule_accepted_status == 1 && this.bookingData[i].cost > 0) {
        rescheduleStatus = "SP Submitted Quote For Res. SR Accepted";
      }
      if (this.bookingData[i].sp_reschedule_status == 0 && this.bookingData[i].pause_type == 2 && this.bookingData[i].confirm_status == 0 && this.bookingData[i].admin_approval_status == 0) {
        rescheduleStatus = "SP Quote Submitted, Admin Approval Pending";
      }
      if (this.bookingData[i].sp_reschedule_status == 0 && this.bookingData[i].pause_type == 2 && this.bookingData[i].confirm_status == 0 && this.bookingData[i].admin_approval_status == 1) {
        rescheduleStatus = "SP Quote Submitted, Admin Approved";
      }
      if (this.bookingData[i].sp_reschedule_status == 0 && this.bookingData[i].pause_type == 2 && this.bookingData[i].confirm_status == 1 && this.bookingData[i].admin_approval_status == 1) {
        rescheduleStatus = "SP Quote Submitted, SR Accepted";
      }
      if (this.bookingData[i].pause_type == 1 && this.bookingData[i].confirm_status == 0) {
        rescheduleStatus = "SP Extended Time, SR Acceptance Pending";
      }
      if (this.bookingData[i].pause_type == 1 && this.bookingData[i].confirm_status == 1) {
        rescheduleStatus = "SP Extended Time, SR Accepted";
      }

      if (this.bookingData[i].paid_medium == 1) {
        paidMedium = "Online/Card";
      }
      if (this.bookingData[i].paid_medium == 2) {
        paidMedium = "Cash";
      }
      if (this.bookingData[i].assign_status == 0) {
        assignStatus = "SP Not Available To Assign";
      }
      if (this.bookingData[i].assign_status == 1) {
        assignStatus = "SP Assigned";
      }
      if (this.bookingData[i].assign_status == 2) {
        assignStatus = "Accepted By SP";
      }
      if (this.bookingData[i].assign_status == 3) {
        assignStatus = "SP Not Accepted, Time Expired";
      }

      var obj = {
        booking_job_no: this.bookingData[i].booking_job_no,
        cat_subcat_name: this.bookingData[i].cat_subcat_name,
        booking_date: this.bookingData[i].booking_date,
        booking_time: this.bookingData[i].booking_time,
        provider_name: this.bookingData[i].provider_name,
        service_requester_name: this.bookingData[i].service_requester_name,
        booking_status: bookingStatus,
        reschedule_status: rescheduleStatus,
        paid_medium: paidMedium,
        before_tax_cost: this.bookingData[i].before_tax_cost,
        tax: this.bookingData[i].tax,
        after_tax_cost: this.bookingData[i].after_tax_cost,
        addtional_total_cost: this.bookingData[i].addtional_total_cost,
        used_wallet_money: this.bookingData[i].wallet_pay_status == 1 ? this.bookingData[i].used_wallet_money : 0,
        total_cost: this.bookingData[i].total_cost + this.bookingData[i].addtional_total_cost,
        assign_status: assignStatus,
      }
      this.csvExportArray.push(obj);
    }
   // console.log("data ==> ", this.csvExportArray);

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: 'booking-list',
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

  cancel_reason(booking_id: string) {
    this.router.navigateByUrl('/main/booking-cancel-details/' + booking_id);
  }

  changeRequest(booking_id: string) {
    this.router.navigateByUrl('/main/approve-change-request/' + booking_id);
  }

}
