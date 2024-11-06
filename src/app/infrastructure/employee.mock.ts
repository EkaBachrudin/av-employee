import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../domain/employee.model';
import { EmployeeRepository } from '../application/employee.repository';
import { generateMockEmployees } from '../shared/employee.generator.';
@Injectable({
  providedIn: 'root'
})
export class EmployeeMockRepository extends EmployeeRepository {
  private employees: Employee[] = generateMockEmployees(100);

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }
}
