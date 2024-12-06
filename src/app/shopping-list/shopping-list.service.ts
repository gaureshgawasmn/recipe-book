import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
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
  startedEditing = new Subject<number>();

  allIngredients = this.ingredients.asReadonly();
  addIngredient(ingredient: Ingredient) {
    this.ingredients().push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients().push(...ingredients);
  }

  getIngredient(index: number) {
    return this.ingredients()[index];
  }

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    const ingredient = this.ingredients()[index];
    ingredient.name = updatedIngredient.name;
    ingredient.amount = updatedIngredient.amount;
  }

  deleteIngredient(index: number) {
    this.ingredients().splice(index, 1);
  }
}
