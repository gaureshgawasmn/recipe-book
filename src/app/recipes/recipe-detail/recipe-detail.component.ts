import { Component, input } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  recipe = input.required<Recipe>();
}
