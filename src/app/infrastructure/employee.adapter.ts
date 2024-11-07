import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee.model';
import { EmployeeRepository } from '../application/employee.repository';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiRepository extends EmployeeRepository {
  private apiUrl = 'https://api.example.com/employees';

  constructor(private http: HttpClient) {
    super();
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
}
