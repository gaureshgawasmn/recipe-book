import { Component, EventEmitter, input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  recipe = input.required<Recipe>();
  @Output() itemSelect = new EventEmitter<Recipe>();

  onItemSelect() {
    this.itemSelect.emit(this.recipe());
  }
}
