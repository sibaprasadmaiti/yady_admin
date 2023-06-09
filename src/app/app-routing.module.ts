import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/guard/auth-guard.service'
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MainComponent } from './page/main/main.component';
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
import { ViewuserComponent } from './page/viewuser/viewuser.component';
import { EmailnotificationComponent } from './page/emailnotification/emailnotification.component';
import { ViewcontactmsgComponent } from './page/viewcontactmsg/viewcontactmsg.component';
import { PlansubscriptionComponent } from './page/plansubscription/plansubscription.component';
import { SubscriptionComponent } from './page/subscription/subscription.component';
import { EditplansubscriptionComponent } from './page/editplansubscription/editplansubscription.component';
import { AddplansubscriptionComponent } from './page/addplansubscription/addplansubscription.component';
import { ProductlistComponent } from './page/productlist/productlist.component';
import { EmailmanagementComponent } from './page/emailmanagement/emailmanagement.component';
import { EditemailtemplateComponent } from './page/editemailtemplate/editemailtemplate.component';
import { OrderlistComponent } from './page/orderlist/orderlist.component';
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
import { RatingReviewComponent } from './page/rating-review/rating-review.component';
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
import { GlobalTaxComponent } from './page/global-tax/global-tax.component';
import { GlobalTaxListComponent } from './page/global-tax-list/global-tax-list.component';
import { GlobalTaxEditComponent } from './page/global-tax-edit/global-tax-edit.component';
import { ApproveChangeRequestComponent } from './page/approve-change-request/approve-change-request.component';
import { ApproveChangeRequestQueryServiceComponent } from './page/approve-change-request-query-service/approve-change-request-query-service.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '#', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'driver', component: DriverComponent },
      { path: 'adddriver', component: AdddriverComponent },
      { path: 'user-management', component: UserMagagementComponent },
      //  {path: 'edit-user/:edituser_id', component: EdituserComponent},
      //  {path: 'Job-management', component: CategoryComponent},
      //  {path: 'edit-job/:editjob_id', component: EditJobComponent},
      { path: 'my-account', component: MyAccountComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'managecontent', component: CmsManagementComponent },
      //  {path: 'addcontent', component: AddcontentComponent},
      //  {path: 'editcontent', component: EditcontentComponent},
      { path: 'editcontent/:cms_id', component: EditCmsComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'faqcategory', component: FaqcategoryComponent },
      { path: 'homecategory', component: HomecategoryComponent },
      { path: 'edithomecategory/:hc_id', component: EdithomecategoryComponent },
      { path: 'addhomecategory', component: AddhomecategoryComponent },
      { path: 'addfaq', component: AddfaqComponent },
      { path: 'editfaq/:f_id', component: EditfaqComponent },
      { path: 'addfaqcategory', component: AddfaqcategoryComponent },
      { path: 'editfaqcategory/:fc_id', component: EditfaqcategoryComponent },
      { path: 'addcontent', component: AddcmsComponent },
      { path: 'viewuser/:u_id', component: ViewuserComponent },
      { path: 'viewemailnotification/:u_id', component: EmailnotificationComponent },
      { path: 'emailnotification', component: EmailnotificationComponent },
      { path: 'viewcustomermessage', component: ViewcontactmsgComponent },
      { path: 'viewcustomermessage/:u_id', component: ViewcontactmsgComponent },
      { path: 'subscriptionplan', component: PlansubscriptionComponent },
      { path: 'editplan/:sp_id', component: EditplansubscriptionComponent },
      { path: 'addplan', component: AddplansubscriptionComponent },
      { path: 'productlist', component: ProductlistComponent },
      { path: 'productlist/:p_search', component: ProductlistComponent },
      { path: 'emailmanagement', component: EmailmanagementComponent },
      { path: 'editemailtemplate/:e_id', component: EditemailtemplateComponent },
      { path: 'orderlist', component: OrderlistComponent },
      { path: 'orderlist/:or_id', component: OrderlistComponent },
      { path: 'sellerpaymentlist', component: PaymentSellerComponent },
      { path: 'paymentmessagesettinglist', component: PaymentmessageComponent },
      { path: 'addpaymentmessage', component: AddpaymentmessageComponent },
      { path: 'editpaymentmessage/:pm_id', component: EditpaymentmessageComponent },
      { path: 'menulist', component: MenulistComponent },
      { path: 'addmenu', component: AddmenuComponent },
      { path: 'editmenu/:id', component: EditmenuComponent },
      { path: 'recipelist', component: RecipelistComponent },
      { path: 'addrecipe', component: AddrecipeComponent },
      { path: 'editrecipe/:id', component: EditrecipeComponent },
      { path: 'videolist', component: VideolistComponent },
      { path: 'addvideo', component: AddvideoComponent },
      { path: 'editvideo/:id', component: EditvideoComponent },
      { path: 'ratingreviewlist', component: RatingReviewComponent },
      { path: 'service-requester-management', component: ServiceRequesterManagementComponent },
      { path: 'service-provider-management', component: ServiceProviderManagementComponent },
      { path: 'service-dispatcher-management', component: ServiceDispatcherManagementComponent },
      { path: 'service-dispatcher-add', component: ServiceDispatcherAddComponent },
      { path: 'category-add', component: CategoryAddComponent },
      { path: 'category-list', component: CategoryListComponent },
      { path: 'category-edit/:id', component: CategoryEditComponent },
      { path: 'sub-category-list/:cat_id', component: SubCategoryListComponent },
      { path: 'sub-category-add/:cat_id', component: SubCategoryAddComponent },
      { path: 'sub-category-edit/:id', component: SubCategoryEditComponent },
      //{path: 'dynamic-field/:cat_id', component: DynamicFieldComponent},
      { path: 'add-ons/:sub_cat_id/:type', component: AddOnsAddComponent },
      { path: 'add-ons-list/:sub_cat_id/:type', component: AddOnsListComponent },
      { path: 'add-ons-edit/:id', component: AddOnsEditComponent },
      { path: 'question-add/:sub_cat_id/:type', component: QuestionAddComponent },
      { path: 'question-list/:sub_cat_id/:type', component: QuestionListComponent },
      { path: 'answer-list/:question_id', component: AnswersListComponent },
      { path: 'question-edit/:id', component: QuestionEditComponent },
      { path: 'category-price-list/:cat_id', component: CategoryPriceListComponent },
      { path: 'sub-category-price-list/:sub_cat_id', component: SubCategoryPriceListComponent },
      { path: 'promo-code-add', component: PromoCodeAddComponent },
      { path: 'promo-code-list', component: PromoCodeListComponent },
      { path: 'promo-code-edit/:id', component: PromoCodeEditComponent },
      { path: 'service-dispatcher-edit/:id', component: ServiceDispatcherEditComponent },
      { path: 'work-radius-list', component: WorkRadiusListComponent },
      { path: 'work-radius-edit/:id', component: WorkRadiusEditComponent },
      { path: 'service-provider-radius/:sp_id', component: ServiceProviderRadiusComponent },
      { path: 'zone-add', component: ZoneAddComponent },
      { path: 'zone-places/:zone_id', component: ZonePlacesComponent },
      { path: 'zone-list', component: ZoneListComponent },
      { path: 'zone-category-add/:zone_id', component: ZoneCategoryComponent },
      { path: 'zone-category-price-list/:zone_id', component: ZoneCategoryPriceListComponent },
      { path: 'zone-category-price-view/:cat_subcat_id/:zone_price_id', component: ZoneCategoryPriceViewComponent },
      { path: 'city-add', component: CityAddComponent },
      { path: 'cat-subcat-area/:cat_id/:subcat_id', component: CatSubcatAreaComponent },
      { path: 'cat-subcat-area-list/:cat_id/:subcat_id', component: CatSubcatAreaListComponent },
      { path: 'cat-subcat-area-places/:area_id', component: CatSubcatAreaPlacesComponent },
      { path: 'holiday-add', component: HolidayAddComponent },
      { path: 'holiday-list', component: HolidayListComponent },
      { path: 'booking-list', component: BookingListComponent },
      { path: 'booking-quotation-approval/:booking_id/:booking_pause_id/:type', component: BookingQuotationApprovalComponent },
      { path: 'booking-details/:booking_id', component: BookingDetailsComponent },
      { path: 'assign-booking/:booking_id', component: AssignBookingComponent },
      { path: 'sr-booking-reschedule/:reschedule_id', component: SrRescheduleRuleComponent },
      { path: 'sr-reschedule-rule-list', component: SrRescheduleRuleListComponent },
      { path: 'zone-category-edit/:zone_cat_subcat_id', component: ZoneCategoryEditComponent },
      { path: 'holiday-edit/:holiday_id', component: HolidayEditComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent },
      { path: 'booking-pause-details/:booking_id', component: BookingPauseDetailsComponent },
      { path: 'booking-cancel-details/:booking_id', component: CancelBookingDetailsComponent },
      { path: 'start-tracking/:booking_id', component: StartTrackingComponent },
      { path: 'service-provider-working-area/:sp_id', component: SpWorkingAreaComponent },
      { path: 'service-provider-working-hours/:sp_id', component: SpWorkingHoursComponent },
      { path: 'booking-images/:booking_id', component: BookingImagesComponent },
      { path: 'query-service-list', component: QueryServiceListComponent },
      { path: 'query-service-details/:service_id', component: QueryServiceDetailsComponent },
      { path: 'assign-query-service/:service_id', component: AssignQueryServiceComponent },
      { path: 'banner-management-list', component: BannerManagementListComponent },
      { path: 'add-banner', component: AddBannerComponent },
      { path: 'notification-management', component: NotificationManagementComponent },
      { path: 'query-service-assign-list/:service_id', component: QueryServiceAssignListComponent },
      { path: 'query-service-assign-details/:query_service_assign_id', component: QueryServiceAssignDetailsComponent },
      { path: 'query-category-add', component: QueryCategoryAddComponent },
      { path: 'query-category-list', component: QueryCategoryListComponent },
      { path: 'query-cat-area-places/:area_id', component: QueryCatPlacesComponent },
      { path: 'query-booking-list', component: QueryBookingListComponent },
      { path: 'query-category-edit/:id', component: QueryCategoryEditComponent },
      { path: 'query-booking-details/:query_booking_id', component: QueryBookingDetailsComponent },
      { path: 'service-provider-location', component: ServiceProviderLocationComponent },
      { path: 'service-provider-transaction/:service_provider_id', component: ServiceProviderTransactionComponent },
      { path: 'admin-percentage-add', component: AdminPercentageAddComponent },
      { path: 'admin-percentage-list', component: AdminPercentageListComponent },
      { path: 'admin-percentage-edit/:admin_percentage_id', component: AdminPercentageUpdateComponent },
      { path: 'service-provider-percentage/:service_provider_id', component: SpPercentageComponent },
      { path: 'user-wallet/:user_id/:user_type', component: UserWalletComponent },
      { path: 'payment-processing', component: PaymentProcessingComponent },
      { path: 'area-wise-report', component: AreaWiseReportComponent },
      { path: 'sr-wise-report', component: SrWiseReportComponent },
      { path: 'sp-wise-report', component: SpWiseReportComponent },
      { path: 'platform-earning-report', component: PlatformEarningReportComponent },
      { path: 'sr-sp-transaction-list/:user_id/:user_type', component: SrSpTransactionListComponent },
	  { path: 'save-tax', component: GlobalTaxComponent },
	  { path: 'tax-list', component: GlobalTaxListComponent },
	  { path: 'tax-edit/:tax_id', component: GlobalTaxEditComponent },
    { path: 'approve-change-request/:booking_id', component: ApproveChangeRequestComponent },
    { path: 'approve-change-request-query-service/:query_booking_id', component: ApproveChangeRequestQueryServiceComponent },

    ]
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
