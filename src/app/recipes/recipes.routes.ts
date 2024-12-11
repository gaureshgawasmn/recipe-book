import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';
import { RecipesComponent } from './recipes.component';

export const recipesRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeHomeComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
    ],
  },
];
