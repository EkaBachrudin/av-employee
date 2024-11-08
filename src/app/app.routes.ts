import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { authGuard } from './shared/guards/auth/auth.guard';
import { EmployeeAddComponent } from './pages/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'add', component: EmployeeAddComponent, canActivate: [authGuard] },
  { path: 'detail/:id', component: EmployeeDetailComponent, canActivate: [authGuard] },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
