import { ApplicationConfig, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeRepository } from './application/employee.repository';
import { EmployeeMockRepository } from './infrastructure/employee.mock';
import { EmployeeApiRepository } from './infrastructure/employee.adapter';
import { environment } from '../environments/environment';

const employeeRepositoryProvider: Provider = {
  provide: EmployeeRepository,
  useClass: environment.useMock ? EmployeeMockRepository : EmployeeApiRepository,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(),
    provideAnimationsAsync(),
    employeeRepositoryProvider
  ]
};
