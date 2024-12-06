import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private DATA_STORE_URL = 'https://recipe-book-gg-default-rtdb.firebaseio.com';

  private http = inject(HttpClient);
  private recipeService = inject(RecipeService);

  saveRecipes() {
    const recipes = this.recipeService.recipes;
    this.http
      .put(this.DATA_STORE_URL + '/recipes.json', recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(this.DATA_STORE_URL + '/recipes.json')
      .subscribe((recipes) => {
        console.log('Recipes fetch successfully');
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}
