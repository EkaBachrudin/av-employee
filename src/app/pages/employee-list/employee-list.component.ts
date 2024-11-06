import { Component, inject } from '@angular/core';
import { LayoutPageComponent } from '../../components/layout-page/layout-page.component';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedDropdownV2Component } from '../../components/dropdown/shared-dropdown-v2/shared-dropdown-v2.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { EmployeeService } from '../../application/employee.service';
import { Employee } from '../../domain/employee.model';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { RupiahPipe } from '../../shared/pipes/rupiah.pipe';
import { FilterService } from '../../shared/services/auth/filter/filter.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    LayoutPageComponent,
    MatIconModule,
    ReactiveFormsModule,
    SharedDropdownV2Component,
    CommonModule,
    MatPaginatorModule,
    RupiahPipe,
    MatMenuModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  form: FormGroup;

  get selectedOption() { return this.form.get('selectedOption') };
  get search() { return this.form.get('search') };

  employeeData: Employee[] = [];

  paginatedEmployees: Employee[] = [];

  totalEmployees: number = 100;
  filteredTotal: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  dropdownOptions: { value: string; label: string }[] = [
    { value: '', label: 'All' },
    { value: 'option2', label: 'Active' },
    { value: 'option3', label: 'Probation' },
    { value: 'option4', label: 'Inactive' }
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private filterService: FilterService,
    private _snackBar: MatSnackBar
  ) {
    const searchFilter = this.filterService.getSearchFilter();
    const statusFilter = this.filterService.getStatusFilter();
    this.form = this.fb.group({
      selectedOption: [statusFilter ? statusFilter : ''],
      search: [searchFilter ? searchFilter: '']
    });
  }

  ngOnInit(): void {
    this.setupSearchDebounce();
    this.getEmplyeeData();
  }

  getEmplyeeData() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employeeData = data;
      this.updatePaginatedEmployees();
    });
  }

  onFilter(): void {
    this.filterService.setSearchFilter(this.search?.value);

    this.updatePaginatedEmployees();
  }

  OnDropDown(event: string) {
    this.filterService.setStatusFilter(event);
    this.updatePaginatedEmployees();
  }

  setupSearchDebounce(): void {
    this.form.get('search')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.onFilter();
      });
  }

  updatePaginatedEmployees() {
    const statusFiltered = this.dropdownOptions.find(dr => dr.value === this.selectedOption?.value);
    const filteredEmployees = this.employeeData.filter(employee => {
      const matchesUsername = employee.username.toLowerCase().includes(this.search?.value.toLowerCase());
      const matchesStatus = statusFiltered?.value ? employee.status === statusFiltered?.label : true;
      return matchesUsername && matchesStatus;
    });

    this.filteredTotal = filteredEmployees.length;
    this.totalEmployees = this.filteredTotal;

    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = filteredEmployees.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedEmployees();
  }

  openSnackBar(value: string, message: string, action: string) {
    this._snackBar.open(value+message, action, {
      duration: 3000,
      panelClass: [message === ' Has Edited' ? 'custom-snackbar' : 'custom-snackbar-del']
    });
  }
}
