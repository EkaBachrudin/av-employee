import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee.model';
import { EmployeeRepository } from './employee.repository';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  getEmployees(): Observable<Employee[]> {
    return this.employeeRepository.getEmployees();
  }
}
