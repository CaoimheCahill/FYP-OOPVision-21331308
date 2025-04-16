import { provideRouter } from '@angular/router';
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {routes} from "./app.routes"
import {provideAnimations} from '@angular/platform-browser/animations';
import {authInterceptor} from './service/auth.interceptor';
import {MarkdownModule} from 'ngx-markdown';
import {ToastrModule} from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    provideAnimations(),
    importProvidersFrom(MarkdownModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }))]
};
