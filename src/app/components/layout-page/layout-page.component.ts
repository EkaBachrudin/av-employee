import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {
  constructor(private authService: AuthService){

  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
  @Input() title!: string;
}
