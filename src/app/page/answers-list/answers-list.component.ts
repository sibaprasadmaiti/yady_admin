import { Component, OnInit, ChangeDetectionStrategy, Input, ViewContainerRef } from '@angular/core';
import {ApiServiceService} from '../../services/api-service/api-service.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

	caption = 'Active';
	public addOnList: any;
	public addOnInfo: any;
	logtoken = localStorage.getItem('LoginToken');
	id: any;
	page = 1;
	answerData: any;
	changeStatusVal: any;
	imageButtons = [ {src: 'tickg.png', name: 'tickg'},
	{src: 'cross.png', name: 'cross'}];
	public imgpath: any;
	public defaultimg: any;
	public question_id: any;
	addForm: FormGroup;
	price;
	showColor = false;
  adminType: any = 0;

  constructor(private route: ActivatedRoute,
				public adminservice: ApiServiceService,
               private router: Router,
               public formbuilder: FormBuilder,
               public toastr: ToastrService,
               private spinnerService: Ng4LoadingSpinnerService,
               public snackBar: MatSnackBar,
               public matDialog: MatDialog) {

					this.addForm = formbuilder.group({
						optionRows: this.formbuilder.array([this.initOptionRows()])
					});
					this.price = 0;
			   }

  ngOnInit() {
    this.adminservice.HttpGetReq(`admin/getprofile?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
        if(response.success){
          this.adminType = response.data.admin_type;
          this.answerListShow();
        }else{
          this.toastr.error(response.message);
        }
      },
      (error) => {
        console.log("Error => ", error);
      }
    );

  }
  get formArr() {
    return this.addForm.get('optionRows') as FormArray;
  }
  initOptionRows() {
    return this.formbuilder.group({
		option:['',Validators.required],
		price:[''],
    });
  }
  addNewRow() {
	this.formArr.push(this.initOptionRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  answerListShow() {
	this.route.params.subscribe(params => {
		this.question_id = params.question_id;
	});
    this.spinnerService.show();
    this.adminservice.HttpGetReq(`admin/viewAnswers/${this.question_id}/?token=${this.logtoken}`, true)
    .then(
      (response: any) => {
		  //console.log(response.data.options);
       this.answerData = response.data.options;
       this.spinnerService.hide();
       this.toastr.success(response.message);
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

  deleteOption(option,index = -1) {
	this.route.params.subscribe(params => {
		this.question_id = params.question_id;
	});

	this.spinnerService.show();
	const formdata = new FormData();
	formdata.append('question_id', this.question_id);
	formdata.append('option', option);

	this.adminservice.HttpPostReq (`admin/deleteAnswer?token=${this.logtoken}`, formdata, true )
      .then(
        (response: any) => {
        //this.answerData.splice(index, 1);
         this.spinnerService.hide();
         this.toastr.success(response.message);
		 this.answerListShow();
        },
       (error) => {
        this.spinnerService.hide();
        this.toastr.error('Internal server error');
        this.snackBar.open('Internal server error', 'End now', {
          duration: 5000,
        });
       }
    )
  }

  addData() {
	this.spinnerService.show();
    const addcontent = this.addForm.value;
	//console.log(addcontent); return false;
	addcontent.question_id = this.question_id;
	//console.log(addcontent); return false;

    this.adminservice.HttpPostReq(`admin/addAnswer?token=${this.logtoken}`, addcontent, true)
    .then(
      (response: any) => {
       this.spinnerService.hide();
       this.toastr.success(response.message);
       //this.router.navigateByUrl('/main/answer-list/'+this.question_id);
	   this.answerListShow();
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
