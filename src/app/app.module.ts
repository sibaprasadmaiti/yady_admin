import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarRatingModule } from 'ngx-star-rating';
// import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatFileUploadModule } from 'angular-material-fileupload';
// import { ModalModule } from 'ngb-modal';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
// import { NgxPayPalModule } from '../../projects/ngx-paypal-lib/src/public_api';
// import { NgxPayPalModule } from 'ngx-paypal';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from '../app/services/guard/auth-guard.service';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MainComponent } from './page/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { UserMagagementComponent } from './page/user-magagement/user-magagement.component';
import { CmsManagementComponent } from './page/cms-management/cms-management.component';
import { MyAccountComponent } from './page/my-account/my-account.component';
import { ChangePasswordComponent } from './page/change-password/change-password.component';
import { EditCmsComponent } from './page/edit-cms/edit-cms.component';
import { FaqComponent } from './page/faq/faq.component';
import { FaqcategoryComponent } from './page/faqcategory/faqcategory.component';
import { HomecategoryComponent } from './page/homecategory/homecategory.component';
import { AddhomecategoryComponent } from './page/addhomecategory/addhomecategory.component';
import { EdithomecategoryComponent } from './page/edithomecategory/edithomecategory.component';
import { AddfaqComponent } from './page/addfaq/addfaq.component';
import { EditfaqComponent } from './page/editfaq/editfaq.component';
import { AddfaqcategoryComponent } from './page/addfaqcategory/addfaqcategory.component';
import { EditfaqcategoryComponent } from './page/editfaqcategory/editfaqcategory.component';
import { AddcmsComponent } from './page/addcms/addcms.component';
import { TokenIntercepterService } from './services/intercepter/token-intercepter.service';
import { ViewuserComponent } from './page/viewuser/viewuser.component';
import { ModalComponent } from './page/modal/modal.component';
import { EmailnotificationComponent } from './page/emailnotification/emailnotification.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewcontactmsgComponent } from './page/viewcontactmsg/viewcontactmsg.component';
// import { CustomermodalComponent } from './components/customermodal/customermodal.component';
import { CustomermodalComponent } from './page/customermodal/customermodal.component';
import { SubscriptionComponent } from './page/subscription/subscription.component';
import { PlansubscriptionComponent } from './page/plansubscription/plansubscription.component';
import { EditplansubscriptionComponent } from './page/editplansubscription/editplansubscription.component';
import { AddplansubscriptionComponent } from './page/addplansubscription/addplansubscription.component';
import { ProductlistComponent } from './page/productlist/productlist.component';
import { EmailmanagementComponent } from './page/emailmanagement/emailmanagement.component';
import { EditemailtemplateComponent } from './page/editemailtemplate/editemailtemplate.component';
import { OrderlistComponent } from './page/orderlist/orderlist.component';
import { RatingReviewComponent } from './page/rating-review/rating-review.component';
import { NgxConfirmBoxModule, NgxConfirmBoxService } from 'ngx-confirm-box';
import { PaymentSellerComponent } from './page/payment-seller/payment-seller.component';
import { PaymentmessageComponent } from './page/paymentmessage/paymentmessage.component';
import { EditpaymentmessageComponent } from './page/editpaymentmessage/editpaymentmessage.component';
import { AddpaymentmessageComponent } from './page/addpaymentmessage/addpaymentmessage.component';
import { DriverComponent } from './page/driver/driver.component';
import { AdddriverComponent } from './page/adddriver/adddriver.component';
import { MenulistComponent } from './page/menulist/menulist.component';
import { AddmenuComponent } from './page/addmenu/addmenu.component';
import { EditmenuComponent } from './page/editmenu/editmenu.component';
import { RecipelistComponent } from './page/recipelist/recipelist.component';
import { AddrecipeComponent } from './page/addrecipe/addrecipe.component';
import { EditrecipeComponent } from './page/editrecipe/editrecipe.component';
import { VideolistComponent } from './page/videolist/videolist.component';
import { AddvideoComponent } from './page/addvideo/addvideo.component';
import { EditvideoComponent } from './page/editvideo/editvideo.component';

import { ServiceRequesterManagementComponent } from './page/service-requester-management/service-requester-management.component';
import { ServiceProviderManagementComponent } from './page/service-provider-management/service-provider-management.component';
import { ServiceDispatcherManagementComponent } from './page/service-dispatcher-management/service-dispatcher-management.component';
import { ServiceDispatcherAddComponent } from './page/service-dispatcher-add/service-dispatcher-add.component';
import { CategoryAddComponent } from './page/category-add/category-add.component';
import { CategoryListComponent } from './page/category-list/category-list.component';
import { CategoryEditComponent } from './page/category-edit/category-edit.component';
import { SubCategoryListComponent } from './page/sub-category-list/sub-category-list.component';
import { SubCategoryAddComponent } from './page/sub-category-add/sub-category-add.component';
import { SubCategoryEditComponent } from './page/sub-category-edit/sub-category-edit.component';
//import { DynamicFieldComponent } from './page/dynamic-field/dynamic-field.component';
import { AddOnsAddComponent } from './page/add-ons-add/add-ons-add.component';
import { AddOnsListComponent } from './page/add-ons-list/add-ons-list.component';
import { AddOnsEditComponent } from './page/add-ons-edit/add-ons-edit.component';
import { QuestionAddComponent } from './page/question-add/question-add.component';
import { QuestionListComponent } from './page/question-list/question-list.component';
import { AnswersListComponent } from './page/answers-list/answers-list.component';
import { QuestionEditComponent } from './page/question-edit/question-edit.component';
import { CategoryPriceListComponent } from './page/category-price-list/category-price-list.component';
import { SubCategoryPriceListComponent } from './page/sub-category-price-list/sub-category-price-list.component';
import { PromoCodeAddComponent } from './page/promo-code-add/promo-code-add.component';
import { PromoCodeListComponent } from './page/promo-code-list/promo-code-list.component';
import { PromoCodeEditComponent } from './page/promo-code-edit/promo-code-edit.component';
import { ServiceDispatcherEditComponent } from './page/service-dispatcher-edit/service-dispatcher-edit.component';
import { WorkRadiusListComponent } from './page/work-radius-list/work-radius-list.component';
import { WorkRadiusEditComponent } from './page/work-radius-edit/work-radius-edit.component';
import { ServiceProviderRadiusComponent } from './page/service-provider-radius/service-provider-radius.component';
import { ZoneAddComponent } from './page/zone-add/zone-add.component';
import { ZonePlacesComponent } from './page/zone-places/zone-places.component';
import { ZoneListComponent } from './page/zone-list/zone-list.component';
import { ZoneCategoryComponent } from './page/zone-category/zone-category.component';
import { ZoneCategoryPriceListComponent } from './page/zone-category-price-list/zone-category-price-list.component';
import { ZoneCategoryPriceViewComponent } from './page/zone-category-price-view/zone-category-price-view.component';
import { CityAddComponent } from './page/city-add/city-add.component';
import { CatSubcatAreaComponent } from './page/cat-subcat-area/cat-subcat-area.component';
import { CatSubcatAreaListComponent } from './page/cat-subcat-area-list/cat-subcat-area-list.component';
import { CatSubcatAreaPlacesComponent } from './page/cat-subcat-area-places/cat-subcat-area-places.component';
import { HolidayAddComponent } from './page/holiday-add/holiday-add.component';
import { HolidayListComponent } from './page/holiday-list/holiday-list.component';
import { BookingListComponent } from './page/booking-list/booking-list.component';
import { BookingDetailsComponent } from './page/booking-details/booking-details.component';
import { AssignBookingComponent } from './page/assign-booking/assign-booking.component';
import { SrRescheduleRuleComponent } from './page/sr-reschedule-rule/sr-reschedule-rule.component';
import { SrRescheduleRuleListComponent } from './page/sr-reschedule-rule-list/sr-reschedule-rule-list.component';
import { ZoneCategoryEditComponent } from './page/zone-category-edit/zone-category-edit.component';
import { HolidayEditComponent } from './page/holiday-edit/holiday-edit.component';
import { BookingAddressGoogleMapComponent } from './page/booking-address-google-map/booking-address-google-map.component';
import { BookingQuotationApprovalComponent } from './page/booking-quotation-approval/booking-quotation-approval.component';
import { EditProfileComponent } from './page/edit-profile/edit-profile.component';
import { BookingPauseDetailsComponent } from './page/booking-pause-details/booking-pause-details.component';
import { CancelBookingDetailsComponent } from './page/cancel-booking-details/cancel-booking-details.component';
import { StartTrackingComponent } from './page/start-tracking/start-tracking.component';
import { SpWorkingAreaComponent } from './page/sp-working-area/sp-working-area.component';
import { SpWorkingHoursComponent } from './page/sp-working-hours/sp-working-hours.component';
import { BookingImagesComponent } from './page/booking-images/booking-images.component';
import { QueryServiceListComponent } from './page/query-service-list/query-service-list.component';
import { QueryServiceDetailsComponent } from './page/query-service-details/query-service-details.component';
import { AssignQueryServiceComponent } from './page/assign-query-service/assign-query-service.component';
import { BannerManagementListComponent } from './page/banner-management-list/banner-management-list.component';
import { AddBannerComponent } from './page/add-banner/add-banner.component';
import { NotificationManagementComponent } from './page/notification-management/notification-management.component';
import { QueryServiceAssignListComponent } from './page/query-service-assign-list/query-service-assign-list.component';
import { QueryServiceAssignDetailsComponent } from './page/query-service-assign-details/query-service-assign-details.component';
import { QueryCategoryAddComponent } from './page/query-category-add/query-category-add.component';
import { QueryCategoryListComponent } from './page/query-category-list/query-category-list.component';
import { QueryCatPlacesComponent } from './page/query-cat-places/query-cat-places.component';
import { QueryBookingListComponent } from './page/query-booking-list/query-booking-list.component';
import { QueryCategoryEditComponent } from './page/query-category-edit/query-category-edit.component';
import { QueryBookingDetailsComponent } from './page/query-booking-details/query-booking-details.component';
import { ServiceProviderLocationComponent } from './page/service-provider-location/service-provider-location.component';
import { ServiceProviderTransactionComponent } from './page/service-provider-transaction/service-provider-transaction.component';
import { AdminPercentageAddComponent } from './page/admin-percentage-add/admin-percentage-add.component';
import { AdminPercentageListComponent } from './page/admin-percentage-list/admin-percentage-list.component';
import { AdminPercentageUpdateComponent } from './page/admin-percentage-update/admin-percentage-update.component';
import { SpPercentageComponent } from './page/sp-percentage/sp-percentage.component';
import { UserWalletComponent } from './page/user-wallet/user-wallet.component';
import { PaymentProcessingComponent } from './page/payment-processing/payment-processing.component';
import { AreaWiseReportComponent } from './page/area-wise-report/area-wise-report.component';
import { SrWiseReportComponent } from './page/sr-wise-report/sr-wise-report.component';
import { SpWiseReportComponent } from './page/sp-wise-report/sp-wise-report.component';
import { PlatformEarningReportComponent } from './page/platform-earning-report/platform-earning-report.component';
import { SrSpTransactionListComponent } from './page/sr-sp-transaction-list/sr-sp-transaction-list.component';
import { SpTransactionListComponent } from './page/sp-transaction-list/sp-transaction-list.component';
import { GlobalTaxComponent } from './page/global-tax/global-tax.component';
import { GlobalTaxListComponent } from './page/global-tax-list/global-tax-list.component';
import { GlobalTaxEditComponent } from './page/global-tax-edit/global-tax-edit.component';
import { ApproveChangeRequestComponent } from './page/approve-change-request/approve-change-request.component';
import { ApproveChangeRequestQueryServiceComponent } from './page/approve-change-request-query-service/approve-change-request-query-service.component';

const logtoken = localStorage.getItem('LoginToken');
//console.log("socket url => ", environment.SOCKET_ENDPOINT);

const config: SocketIoConfig = {
  url: environment.SOCKET_ENDPOINT,
  options: { transports: ['websocket'], query: { token: logtoken, forceNew: 'true' } }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    ForgotPasswordComponent,
    UserMagagementComponent,
    CmsManagementComponent,
    MyAccountComponent,
    ChangePasswordComponent,
    EditCmsComponent,
    FaqComponent,
    FaqcategoryComponent,
    HomecategoryComponent,
    AddhomecategoryComponent,
    EdithomecategoryComponent,
    AddfaqComponent,
    EditfaqComponent,
    AddfaqcategoryComponent,
    EditfaqcategoryComponent,
    AddcmsComponent,
    ViewuserComponent,
    ModalComponent,
    EmailnotificationComponent,
    ViewcontactmsgComponent,
    CustomermodalComponent,
    SubscriptionComponent,
    PlansubscriptionComponent,
    EditplansubscriptionComponent,
    AddplansubscriptionComponent,
    ProductlistComponent,
    EmailmanagementComponent,
    EditemailtemplateComponent,
    OrderlistComponent,
    RatingReviewComponent,
    PaymentSellerComponent,
    PaymentmessageComponent,
    EditpaymentmessageComponent,
    AddpaymentmessageComponent,
    DriverComponent,
    AdddriverComponent,
    MenulistComponent,
    AddmenuComponent,
    EditmenuComponent,
    RecipelistComponent,
    AddrecipeComponent,
    EditrecipeComponent,
    VideolistComponent,
    AddvideoComponent,
    EditvideoComponent,
    ServiceRequesterManagementComponent,
    ServiceProviderManagementComponent,
    ServiceDispatcherManagementComponent,
    ServiceDispatcherAddComponent,
    CategoryAddComponent,
    CategoryListComponent,
    CategoryEditComponent,
    SubCategoryListComponent,
    SubCategoryAddComponent,
    SubCategoryEditComponent,
    //DynamicFieldComponent,
    AddOnsAddComponent,
    AddOnsListComponent,
    AddOnsEditComponent,
    QuestionAddComponent,
    QuestionListComponent,
    AnswersListComponent,
    QuestionEditComponent,
    CategoryPriceListComponent,
    SubCategoryPriceListComponent,
    PromoCodeAddComponent,
    PromoCodeListComponent,
    PromoCodeEditComponent,
    ServiceDispatcherEditComponent,
    WorkRadiusListComponent,
    WorkRadiusEditComponent,
    ServiceProviderRadiusComponent,
    ZoneAddComponent,
    ZonePlacesComponent,
    ZoneListComponent,
    ZoneCategoryComponent,
    ZoneCategoryPriceListComponent,
    ZoneCategoryPriceViewComponent,
    CityAddComponent,
    CatSubcatAreaComponent,
    CatSubcatAreaListComponent,
    CatSubcatAreaPlacesComponent,
    HolidayAddComponent,
    HolidayListComponent,
    BookingListComponent,
    BookingDetailsComponent,
    AssignBookingComponent,
    SrRescheduleRuleComponent,
    SrRescheduleRuleListComponent,
    ZoneCategoryEditComponent,
    HolidayEditComponent,
    BookingAddressGoogleMapComponent,
    BookingQuotationApprovalComponent,
    EditProfileComponent,
    BookingPauseDetailsComponent,
    CancelBookingDetailsComponent,
    StartTrackingComponent,
    SpWorkingAreaComponent,
    SpWorkingHoursComponent,
    BookingImagesComponent,
    QueryServiceListComponent,
    QueryServiceDetailsComponent,
    AssignQueryServiceComponent,
    BannerManagementListComponent,
    AddBannerComponent,
    NotificationManagementComponent,
    QueryServiceAssignListComponent,
    QueryServiceAssignDetailsComponent,
    QueryCategoryAddComponent,
    QueryCategoryListComponent,
    QueryCatPlacesComponent,
	QueryBookingListComponent,
	QueryCategoryEditComponent,
	QueryBookingDetailsComponent,
	ServiceProviderLocationComponent,
	ServiceProviderTransactionComponent,
	AdminPercentageAddComponent,
	AdminPercentageListComponent,
	AdminPercentageUpdateComponent,
	SpPercentageComponent,
	UserWalletComponent,
	PaymentProcessingComponent,
	AreaWiseReportComponent,
	SrWiseReportComponent,
	SpWiseReportComponent,
	PlatformEarningReportComponent,
	SrSpTransactionListComponent,
	SpTransactionListComponent,
	GlobalTaxComponent,
	GlobalTaxListComponent,
	GlobalTaxEditComponent,
	ApproveChangeRequestComponent,
	ApproveChangeRequestQueryServiceComponent
  ],
  entryComponents: [
    ForgotPasswordComponent, ModalComponent, CustomermodalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MatCheckboxModule,
    MatFormFieldModule,
	MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSelectModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularEditorModule,
    NgxConfirmBoxModule,
    MatFileUploadModule,
    // ModalModule
    AutocompleteLibModule,
    // NgbModule
    NgxStarRatingModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-D0BU9p64xEqJI6pQOGguMoPV5NTJ6T4',
      libraries: ['places']
    }),
    AgmDirectionModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [AuthGuardService, NgxConfirmBoxService, { provide: LocationStrategy, useClass: HashLocationStrategy }
    //   {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenIntercepterService,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
