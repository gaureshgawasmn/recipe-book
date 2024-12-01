import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';

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
  private shoppingListService = inject(ShoppingListService);

  addIngredient() {
    this.shoppingListService.addIngredient({
      name: this.name,
      amount: this.amount,
    });
  }
}
