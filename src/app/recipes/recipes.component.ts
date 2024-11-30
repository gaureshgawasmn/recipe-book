import { Component } from '@angular/core';
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
    selectedRecipe: Recipe | undefined;

    onRecipeSelect(recipe: Recipe){
      this.selectedRecipe = recipe;
    }
}
