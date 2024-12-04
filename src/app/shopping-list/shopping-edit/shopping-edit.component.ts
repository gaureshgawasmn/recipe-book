import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  private shoppingListService = inject(ShoppingListService);
  shoppingItemForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  ngOnInit() {
    this.shoppingItemForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      console.log(this.shoppingItemForm.value);
    });
  }

  addIngredient() {
    if (this.shoppingItemForm.invalid) {
      return;
    }
    this.shoppingListService.addIngredient({
      name: this.shoppingItemForm.get('name')?.value,
      amount: this.shoppingItemForm.get('amount')?.value,
    });
    this.reset();
  }

  reset() {
    this.shoppingItemForm.reset();
  }
}
