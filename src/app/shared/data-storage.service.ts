import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
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
    const recipes = this.recipeService.recipes();
    this.http
      .put(this.DATA_STORE_URL + '/recipes.json', recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(this.DATA_STORE_URL + '/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return { ...recipe, ingredients: recipe.ingredients || [] };
          });
        })
      )
      .subscribe((recipes) => {
        console.log('Recipes fetch successfully');
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}

export const fetchRecipesResolver: ResolveFn<void> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const dataStorageService = inject(DataStorageService);
  const recipeService = inject(RecipeService);
  if (recipeService.recipes().length === 0) {
    dataStorageService.fetchRecipes();
  }
};
