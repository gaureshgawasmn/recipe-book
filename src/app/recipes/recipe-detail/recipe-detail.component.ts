import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  router = inject(Router);

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

  deleteRecipe() {
    this.recipeService.delete(+this.id());
    this.router.navigate(['../']);
  }
}
