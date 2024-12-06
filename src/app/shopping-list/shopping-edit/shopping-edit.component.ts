import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  private readonly shoppingListService = inject(ShoppingListService);
  shoppingItemForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });
  destroyRef = inject(DestroyRef);
  editMode = false;
  editedIndex: number = 0;
  editedItem: Ingredient | undefined;

  ngOnInit() {
    this.shoppingItemForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      console.log(this.shoppingItemForm.value);
    });
    const subcription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(
          this.editedIndex
        );
        this.shoppingItemForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
    this.destroyRef.onDestroy(() => {
      subcription.unsubscribe();
    });
  }

  addIngredient() {
    if (this.shoppingItemForm.invalid) {
      return;
    }
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIndex, {
        name: this.shoppingItemForm.get('name')?.value,
        amount: this.shoppingItemForm.get('amount')?.value,
      });
    } else {
      this.shoppingListService.addIngredient({
        name: this.shoppingItemForm.get('name')?.value,
        amount: this.shoppingItemForm.get('amount')?.value,
      });
    }
    this.reset();
  }

  reset() {
    this.shoppingItemForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedIndex);
    }
    this.reset();
  }
}
