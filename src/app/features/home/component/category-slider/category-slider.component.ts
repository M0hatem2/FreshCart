import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-slider',
  imports: [],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css',
  standalone: true,
})
export class CategorySliderComponent {
  @Input() user?: string;
}
