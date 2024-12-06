import { Component, inject, input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  id = input.required<string>();
  editMode = false;
  showImg = false;
  recipeService = inject(RecipeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    imagePath: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
    ingredients: new FormArray([]),
  });

  toggleShowImg() {
    this.showImg = !this.showImg;
  }

  ngOnInit() {
    this.editMode = this.id() != undefined;
    console.log('We are in edit mode ' + this.editMode);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(+this.id());
      this.editForm.setValue({
        name: recipe.name,
        imagePath: recipe.imgPath,
        description: recipe.description,
        ingredients: [],
      });
      for (let ingredient of recipe.ingredients) {
        (<FormArray>this.editForm.get('ingredients')).push(
          new FormGroup({
            name: new FormControl(ingredient.name, {
              validators: [Validators.required, Validators.minLength(3)],
            }),
            amount: new FormControl(ingredient.amount, {
              validators: [Validators.required, Validators.min(1)],
            }),
          })
        );
      }
    }
  }

  get controls() {
    return (<FormArray>this.editForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.editForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl<string>('', {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        amount: new FormControl<number | null>(null, {
          validators: [Validators.required, Validators.min(1)],
        }),
      })
    );
  }

  onSubmit() {
    const recipe: Recipe = {
      name: this.editForm.value.name as string,
      imgPath: this.editForm.value.imagePath as string,
      description: this.editForm.value.description as string,
      ingredients:
        this.editForm.value.ingredients?.map((ingredientFormGroup: any) => ({
          name: ingredientFormGroup.name,
          amount: ingredientFormGroup.amount,
        })) || [],
    };

    if (this.editMode) {
      this.recipeService.update(+this.id(), recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.editForm.get('ingredients')).removeAt(index);
  }
}
