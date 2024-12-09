import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth/auth.gaurd';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeHomeComponent } from './recipes/recipe-home/recipe-home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { fetchRecipesResolver } from './shared/data-storage.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: { voidAction: fetchRecipesResolver },
    canActivate: [authGuard],
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
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];
