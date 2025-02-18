import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    ConfirmationService,
    MessageService,
    provideAnimationsAsync(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    providePrimeNG({  theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
  ]
};
