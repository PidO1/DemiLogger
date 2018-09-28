// import { Injectable } from '@angular/core';
// import {
//     HttpRequest,
//     HttpHandler,
//     HttpEvent,
//     HttpInterceptor
//   } from '@angular/common/http';
// import { PgpdServiceService } from './pgpd-service.service';
// import { Observable } from 'rxjs';
//
// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//     constructor(public pgpd: PgpdServiceService) {}
//
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         request = request.clone({
//           setHeaders: {
//             Authorization: `Bearer ${this.pgpd.getToken()}`
//           }
//         });
//         return next.handle(request);
//       }
//     }
