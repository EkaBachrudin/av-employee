import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {

  }

  loginForm!: FormGroup;

  get email() { return this.loginForm.get('email') };
  get password() { return this.loginForm.get('password') };

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      console.log('Form Submitted', this.loginForm.value);

    } else {
      console.log('Form is invalid');
    }
  }

  get emailErrors() {
    if (this.email?.hasError('required')) {
      return 'Email is required.';
    } else if (this.email?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    return null;
  }

  get passwordErrors() {
    if (this.password?.hasError('required')) {
      return 'Password is required.';
    } else if (this.password?.hasError('minlength')) {
      return 'Minimum 8 character.';
    }
    return null;
  }
}
