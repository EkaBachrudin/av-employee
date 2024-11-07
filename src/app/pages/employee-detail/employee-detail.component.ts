import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../application/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService
  ){

  }

  ngOnInit(): void {
    this.getEmployeeDetail();
  }

  getEmployeeDetail() {
    const employeeId: number = 1;
    this.employeeService.getEmployeeById(employeeId).subscribe((data) => {
     console.log(data)
    });
  }

}
