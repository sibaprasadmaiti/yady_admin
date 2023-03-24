import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public HttpClient: HttpClient, public loader: NgxSpinnerService, public toast: ToastrService) { }
  HttpGetReq(url, load) {
    return  new Promise(async (resolve, reject) => {
      if (load) {
        this.loader.show();
      }
      this.HttpClient.get(`${environment.api_url}` + url, {}).subscribe(async res => {
        if (load) {
          await this.loader.hide();
        }
        resolve(res);
      }, async (error) => {
        reject(error);
        if (load) {
          await this.loader.hide();
        }
      });
    });
  }
  HttpPostReq(url, data, load) {
    return  new Promise(async (resolve, reject) => {
      if (load) { this.loader.show(); }
      this.HttpClient.post(`${environment.api_url}` + url, data,   {  }).subscribe(async res => {
        if (load) { await this.loader.hide(); }
        resolve(res);
      }, async (error) => {
        reject(error);
        this.toast.success('Internal Server Error!!!');
        if (load) {     await this.loader.hide(); }
      });
    });
  }
  HttpDelReq(url, load) {
    console.log('url:::', url);
    return  new Promise(async (resolve, reject) => {
      if (load) {   this.loader.show(); }
      this.HttpClient.delete(`${environment.api_url}` + url, {}).subscribe(async res => {
        if (load) {   await this.loader.hide(); }
        resolve(res);
      }, async (error) => {
        reject(error);
        if (load) {   await this.loader.hide(); }
      });
    });
  }
  HttpPutReq(url, data, load) {
    return  new Promise(async (resolve, reject) => {
      if (load) { this.loader.show(); }
      this.HttpClient.put(`${environment.api_url}` + url, data,   {  }).subscribe(async res => {
        if (load) { await this.loader.hide(); }
        resolve(res);
      }, async (error) => {
        reject(error);
        this.toast.success('Internal Server Error!!!');
        if (load) {     await this.loader.hide(); }
      });
    });
  }

  HttpGetReq2(url, load) {
    return  new Promise(async (resolve, reject) => {
      if (load) {
        this.loader.show();
      }
      this.HttpClient.get( url, {}).subscribe(async res => {
        if (load) {
          await this.loader.hide();
        }
        resolve(res);
      }, async (error) => {
        reject(error);
        if (load) {
          await this.loader.hide();
        }
      });
    });
  }
}
