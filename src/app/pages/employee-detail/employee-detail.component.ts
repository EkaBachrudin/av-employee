import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../application/employee.service';
import { LayoutPageComponent } from '../../components/layout-page/layout-page.component';
import { Employee } from '../../domain/employee.model';
import { CommonModule } from '@angular/common';
import { RupiahPipe } from "../../shared/pipes/rupiah.pipe";
import moment from 'moment';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    LayoutPageComponent,
    RupiahPipe,
    RouterModule
],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {

  id: string | null = null;

  employeeData!: Employee;
  birthdateFormated!: string;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEmployeeDetail();
  }

  getEmployeeDetail() {
    this.employeeService.getEmployeeById(this.id ? this.id : '').subscribe((data) => {
      this.employeeData = data;
      this.birthdateFormated = moment(this.employeeData.birthDate).format('DD / MM / YYYY');
    });
  }

}
