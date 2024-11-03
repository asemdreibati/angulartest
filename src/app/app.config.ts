import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers } from './reducers/reducers';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TestData } from './test-data';
import { UserService } from './services/user.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(TestData),
    ]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([UserEffects]),
    UserService,
    provideAnimations(),
    provideHttpClient(),
  ]
};
