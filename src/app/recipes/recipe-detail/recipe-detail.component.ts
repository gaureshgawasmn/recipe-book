import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  id = input.required<string>();

  private readonly shoppingListService = inject(ShoppingListService);
  private readonly recipeService = inject(RecipeService);

  get recipe() {
    return signal(this.recipeService.getRecipe(+this.id()));
  }

  ngOnInit() {
    console.log(this.id());
  }

  addToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe().ingredients);
  }
}
