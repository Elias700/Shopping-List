

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';

import { provideHttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAuth0({
      domain: 'dev-xumznb75xdz3aw6t.us.auth0.com',
      clientId: 'NsyCpKROF6gGD9zSk4Ml7EUFUQ0L6ofb',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-xumznb75xdz3aw6t.us.auth0.com/api/v2/',
        scope: 'openid profile email offline_access',
      },
    }),
  ]
};
