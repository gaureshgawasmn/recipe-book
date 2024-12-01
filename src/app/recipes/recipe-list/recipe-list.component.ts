import { Component, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  private recipeService = inject(RecipeService);

  ngOnInit() {
    this.recipes = this.recipeService.recipes();
  }

  onRecipeSelect(recipe: Recipe) {
    this.recipeService.selectRecipe(recipe);
  }
}
