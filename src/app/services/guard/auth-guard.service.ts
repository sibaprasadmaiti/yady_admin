import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  constructor(private router:Router) { }
  async canActivate(){
    let temp=false;
   // console.log('temp', temp,localStorage.getItem('LoginToken'))
    let token=   localStorage.getItem('LoginToken')
    if(token){
      temp=true;
    } else{
      this.router.navigate(['']);
      temp=false;
    }
    return await temp;
  }
}
