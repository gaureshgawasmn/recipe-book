import { Injectable, signal } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients = signal([
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ]);

  allIngredients = this.ingredients.asReadonly();
  addIngredient(ingredient: Ingredient) {
    this.ingredients().push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients().push(...ingredients);
  }
}
