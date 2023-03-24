import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{

  constructor() { }
  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    let token= localStorage.getItem('LoginToken')
    const tokenId =token;
    if (tokenId) {
    const cloned = req.clone({
    params: req.params.set("token",tokenId),
    // headers: req.headers.set('Authorization', tokenId)
    });
    return next.handle(cloned);
    
    } else {
    return next.handle(req);
    }
    }

}
