import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  constructor(public loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request = request.clone({ headers: request.headers.set('accept-language', 'en-US') });
    console.log(request);

    this.loadingService.show();

    return next.handle(request).pipe(
      delay(500),
      finalize(() => this.loadingService.hide()));
  }
}
