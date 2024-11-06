import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../domain/employee.model';
import { EmployeeRepository } from '../application/employee.repository';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeMockRepository extends EmployeeRepository {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    super();
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }
}
