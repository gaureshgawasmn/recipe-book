import { Component, inject, input } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
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
  private shoppingListService = inject(ShoppingListService);

  addToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe().ingredients);
  }
}
