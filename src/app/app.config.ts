import { ApplicationConfig, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeRepository } from './application/employee.repository';
import { EmployeeMockRepository } from './infrastructure/employee.mock';
import { EmployeeApiRepository } from './infrastructure/employee.adapter';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const employeeRepositoryProvider: Provider = {
  provide: EmployeeRepository,
  useClass: environment.useMock ? EmployeeMockRepository : EmployeeApiRepository,
};

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  },
  display: {
    dateInput: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(),
    provideAnimationsAsync(),
    employeeRepositoryProvider,
    provideHttpClient(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ]
};
