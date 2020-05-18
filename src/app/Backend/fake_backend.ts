import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/Operators';
import * as fs from 'fs';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

return of(null).pipe(mergeMap(() => {
      if (request.url.startsWith('/api/products') && request.method === 'GET') {
        fs.readFile('./products.json', (err, data) => {
          if (err) {
            return of(new HttpResponse({status: 500, body: {error: err}}));
          }
          const products = JSON.parse(data.toString());
          return of(new HttpResponse({status: 200, body: { data: products}}));
        });
      }

      if (request.url.match(/\/api\/product\/\w+$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const productName = urlParts[2];

        fs.readFile('./products.json', (err, data) => {
          if (err) {
            return of(new HttpResponse({status: 500, body: {error: err}}));
          }
          const products = JSON.parse(data.toString());
          if (products[productName]){
          return of(new HttpResponse({status: 200, body: { data: products[productName]}}));
          } else {
            return of(new HttpResponse({status: 404, body: {error: `no such product ${productName}`}}));
          }
        });
      }
      return next.handle(request);
  }));
  }
}


export const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
