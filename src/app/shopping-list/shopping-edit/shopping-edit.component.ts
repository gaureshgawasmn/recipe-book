import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  name: string = '';
  amount: number = 0;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  addIngredient() {
    this.ingredientAdded.emit({
      name: this.name,
      amount: this.amount,
    });
  }
}
