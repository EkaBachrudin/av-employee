import { Component } from '@angular/core';
import { LayoutPageComponent } from '../../components/layout-page/layout-page.component';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedDropdownV2Component } from '../../components/dropdown/shared-dropdown-v2/shared-dropdown-v2.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { EmployeeService } from '../../application/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    LayoutPageComponent,
    MatIconModule,
    ReactiveFormsModule,
    SharedDropdownV2Component
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  form: FormGroup;

  get selectedOption() { return this.form.get('selectedOption') };

  dropdownOptions: { value: string; label: string }[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.form = this.fb.group({
      selectedOption: ['option1'],
      search: ['']
    });
  }

  ngOnInit(): void {
    this.setupSearchDebounce();

    this.employeeService.getEmployees().subscribe((data) => {
      console.log(data);
    });
  }

  onFilter(): void {
    console.log('Form Value:', this.form.value);
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
}
