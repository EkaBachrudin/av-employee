import { Component } from '@angular/core';
import { LayoutPageComponent } from "../../components/layout-page/layout-page.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'moment';
import { RupiahFormatterDirective } from '../../shared/directives/rupiah-formatter.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    LayoutPageComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule,
    RupiahFormatterDirective,
    MatIconModule
  ],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss'
})
export class EmployeeAddComponent {
  selectedDate!: string;

  maxDate: Date = new Date();
  employeeForm!: FormGroup;

  get username() { return this.employeeForm.get('username'); }
  get firstName() { return this.employeeForm.get('firstName'); }
  get lastName() { return this.employeeForm.get('lastName'); }
  get email() { return this.employeeForm.get('email'); }
  get birthDate() { return this.employeeForm.get('birthDate'); }
  get basicSalary() { return this.employeeForm.get('basicSalary'); }
  get status() { return this.employeeForm.get('status'); }
  get group() { return this.employeeForm.get('group'); }
  get description() { return this.employeeForm.get('description'); }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: [
        '',
        [Validators.required],
      ],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const isoFormat = moment(event.value).toISOString();
      this.birthDate?.setValue(isoFormat);
      this.selectedDate = moment(isoFormat).format('DD / MM / YYYY');
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Form Submitted', this.employeeForm.value);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}
