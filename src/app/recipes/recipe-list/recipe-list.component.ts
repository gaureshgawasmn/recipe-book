import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    {
      name: 'Test Recipe',
      description: 'A test recipe',
      imgPath:
        'https://i0.wp.com/picjumbo.com/wp-content/uploads/korean-bibimbap-flatlay.jpg?w=2210&quality=70',
    },
  ];

  @Output() recipeSelect = new EventEmitter<Recipe>();

  onRecipeSelect(recipe: Recipe) {
    this.recipeSelect.emit(recipe);
  }
}
