import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

   const authTokenKey = 'xZaSwqS';
   const token = localStorage.getItem(authTokenKey) || '';
   const authHeaders = req.clone({headers: req.headers.set("X-Auth-Token", token)});
   const contentHeaders = authHeaders.clone({headers: authHeaders.headers.set('Content-Type', 'application/json')});


    return next.handle(contentHeaders).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('---> status:', evt.status);
      }
    });

  }
}
