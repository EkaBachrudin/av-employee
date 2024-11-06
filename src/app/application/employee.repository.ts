import { Observable } from 'rxjs';
import { Employee } from '../domain/employee.model';

export abstract class EmployeeRepository {
  abstract getEmployees(): Observable<Employee[]>;
}