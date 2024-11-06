import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {
  @Input() title!: string;
}