import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { catchError, Observable, tap, throwError } from 'rxjs';

export function loaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loaderService = inject(LoaderService);
  loaderService.show();
  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        loaderService.hide();
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        loaderService.hide();
      }
      return throwError(() => error);
    })
  );
}
