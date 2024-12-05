import { provideRouter } from '@angular/router';
import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {ConfigService} from './service/config.service';

function initializeApp(configService: ConfigService): () => Promise<void> {
  return () => configService.loadConfig();
}


export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService]},
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
  ],
};
