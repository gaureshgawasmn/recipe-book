import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.gaurd';
import { fetchRecipesResolver } from './shared/data-storage.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.routes').then((m) => m.recipesRoutes),
    resolve: { voidAction: fetchRecipesResolver },
    canActivate: [authGuard],
  },
  {
    path: 'shopping-list',
    loadComponent: () =>
      import('./shopping-list/shopping-list.component').then(
        (c) => c.ShoppingListComponent
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
  },
];
