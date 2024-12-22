import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpHeadersInterceptor } from '@interceptors/http-headers.interceptor';
import { loaderInterceptor } from '@interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([httpHeadersInterceptor, loaderInterceptor])),
  ],
};
