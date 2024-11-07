import { Observable } from 'rxjs';
import { Employee } from '../domain/employee.model';

export abstract class EmployeeRepository {
  abstract getEmployees(): Observable<Employee[]>;
  abstract getEmployeeById(id: string): Observable<Employee>;
  abstract addEmployee(employee: Employee): Observable<any>;
}
